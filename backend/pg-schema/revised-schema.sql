-- revised pg schemas

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TYPE user_role AS ENUM('renter', 'owner', 'none');

CREATE TABLE public_users (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    role user_role DEFAULT 'none',
    profile_image_key TEXT
);

CREATE TYPE employee_role AS ENUM('manager', 'daily operations', 'finance', 'other');

CREATE TABLE employee_users (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role employee_role NOT NULL,
    phone_number TEXT NOT NULL,
    profile_image_key TEXT
);

CREATE TABLE management_companies (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL, -- did not add UNIQUE constraint for simplicity
    address TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    unit_count INT DEFAULT 0 -- there's a trigger for this is all the way at the end
);

-- CREATE TABLE company_address (
--     company_id INT PRIMARY KEY REFERENCES management_companies(user_id) ON DELETE CASCADE,
--     country TEXT DEFAULT 'Canada', -- assuming we're doing canada only
--     province TEXT NOT NULL,
--     city TEXT NOT NULL, 
--     street_name TEXT NOT NULL,
--     postal_code CHAR(7) NOT NULL, -- format of 'A3A 3A3'
--     apartment_number TEXT
-- );

CREATE TABLE property (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES management_companies(user_id),
    address TEXT UNIQUE NOT NULL,
    flat_fee NUMERIC(10, 2) DEFAULT 0, -- a flat fee all tenants are suppoed to pay (optional)
    parking_fee NUMERIC(5, 2) DEFAULT 0, -- fee per parking spot
    locker_fee NUMERIC(5, 2) DEFAULT 0,
    price_per_square_foot NUMERIC(5, 2) DEFAULT 0,
    image_key TEXT,
    image_url TEXT
);

CREATE TABLE condo_unit (
    id SERIAL PRIMARY KEY,
    property_id INT REFERENCES property(id),
    unit_number TEXT NOT NULL, -- like apartment number but could be letters too
    square_feet NUMERIC(5, 2) NOT NULL,
    image_key TEXT,
    image_url TEXT,
    UNIQUE (property_id, unit_number)
);

-- CREATE TABLE property_address (
--     property_id INT PRIMARY KEY REFERENCES property(id) ON DELETE CASCADE,
--     country TEXT DEFAULT 'Canada',
--     province TEXT NOT NULL,
--     city TEXT NOT NULL,
--     street_name TEXT NOT NULL,
--     postal_code CHAR(7) NOT NULL
-- );

CREATE TYPE registration_type AS ENUM('renter', 'owner');

CREATE TABLE registration ( -- omitted company_id since it could be found using property_id
    -- this table replaces the previous owned_by table
    registration_key uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type registration_type NOT NULL,
    issued_at TIMESTAMP DEFAULT NOW(),
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP, -- null means ongoing renter or owner
    public_user_id INT REFERENCES public_users(user_id) ON DELETE CASCADE,
    condo_id INT REFERENCES condo_unit(id) ON DELETE CASCADE,
    UNIQUE (condo_id, start_date, end_date) -- only one person at a time can own/rent a specific property
);

CREATE TABLE employed_by (
    employee_user_id INT REFERENCES employee_users(user_id) ON DELETE CASCADE,
    company_id INT REFERENCES management_companies(user_id) ON DELETE CASCADE,
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP DEFAULT NULL, -- null for ongoing employee
    PRIMARY KEY (employee_user_id, end_date) -- an employee could work at one company at a time
);

CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    text_id TEXT, -- lockers, parking spots and other amenities might have some kind of identifier
    property_id INT REFERENCES property(id) ON DELETE CASCADE,
    description TEXT NOT NULL, -- 'locker', 'parking spot' or anything else
    fee NUMERIC(5, 2) NOT NULL,
    UNIQUE (id, property_id)
);

CREATE TABLE reserved_by (
    public_user_id INT REFERENCES public_users(user_id) ON DELETE CASCADE,
    amenities_id INT REFERENCES amenities(id),
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (public_user_id, amenities_id, start_date) -- included start date cause same user could reserve same amenities later also
);

CREATE TYPE priority AS ENUM('low', 'medium', 'high');

CREATE TABLE requests (
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    request_priority priority DEFAULT 'low',
    issued_at TIMESTAMP DEFAULT NOW(),
    condo_owner_id INT REFERENCES public_users(user_id),
    employee_id INT REFERENCES employee_users(user_id),
    PRIMARY KEY (condo_owner_id, employee_id, title, issued_at)
);

CREATE TYPE file_type AS ENUM('declarations', 'annual budgets', 'board meeting minutes', 'other');

CREATE TABLE condo_management_files (
    file_key TEXT PRIMARY KEY,
    file_type file_type DEFAULT 'other',
    company_id INT REFERENCES management_companies(user_id),
    property_id INT REFERENCES property(id),
    description TEXT
);

-- trigger for incrementing unit_count of management companies whenever
-- a new property that belongs to that management company is inserted
CREATE FUNCTION increment_unit_count_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE management_companies AS mc
    SET mc.unit_count = mc.unit_count + NEW.unit_count
    WHERE mc.user_id = NEW.company_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_unit_count
AFTER INSERT ON condo_unit
FOR EACH ROW
EXECUTE FUNCTION increment_unit_count_function();

-- trigger for decrementing unit count of management companies whenever
-- a property that belongs to that management company is deleted
CREATE FUNCTION decrement_unit_count_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE management_companies AS mc
    SET mc.unit_count = mc.unit_count - OLD.unit_count
    WHERE mc.user_id = OLD.company_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_unit_count
AFTER DELETE ON condo_unit
FOR EACH ROW
EXECUTE FUNCTION decrement_unit_count_function();