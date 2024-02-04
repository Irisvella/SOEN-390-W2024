-- these commands were initially used to populate a local pg db 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TABLE public_users (
    id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL, -- serves as a display name (does it have to be unique?)
    phone_number TEXT NOT NULL,
    profile_image_key TEXT
);

CREATE TABLE management_companies (
    id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    address TEXT NOT NULL,
    unit_count INT DEFAULT 0,
    parking_count INT DEFAULT 0,
    locker_count INT DEFAULT 0,
    UNIQUE (company_name, address)
);

CREATE TABLE property (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    unit_id INT NOT NULL,
    size INT NOT NULL, -- square feet
    condo_fee NUMERIC(10, 2) NOT NULL,
    UNIQUE (address, unit_id)
);

CREATE TABLE owned_by (
    owner_id INT REFERENCES users(id),
    property_id INT REFERENCES property(id),
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP DEFAULT NULL, -- null means current owner
    PRIMARY KEY (owner_id, property_id)
);

CREATE TYPE registration_type AS ENUM('renter', 'owner');

CREATE TABLE registration_key (
    key_text TEXT PRIMARY KEY,
    type registration_type NOT NULL,
    issued_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL,
    company_id INT REFERENCES management_companies(id) ON DELETE CASCADE,
    public_user_id INT REFERENCES public_users(id) ON DELETE CASCADE,
    property_id INT REFERENCES property(id) ON DELETE CASCADE
);

CREATE TYPE employee_role AS ENUM('manager', 'daily operations', 'finance', 'other');

CREATE TABLE employed_by (
    public_user_id INT REFERENCES public_users(id) ON DELETE CASCADE,
    company_id INT REFERENCES management_companies(id) ON DELETE CASCADE,
    yearly_salary NUMERIC(10, 2) NOT NULL, -- should we have more fields for pay?
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP DEFAULT NULL, -- null for currently employed
    role employee_role NOT NULL,
    PRIMARY KEY(public_user_id, company_id)
);

CREATE TABLE common_facilities (
    id SERIAL PRIMARY KEY,
    facility_name TEXT NOT NULL
);

CREATE TABLE belongs_to (
    property_id INT REFERENCES property(id) ON DELETE CASCADE,
    common_facility_id INT REFERENCES common_facilities(id) ON DELETE CASCADE,
    PRIMARY KEY (property_id, common_facility_id)
);

CREATE TABLE reserved_by (
    public_user_id INT REFERENCES public_users(id) ON DELETE CASCADE,
    facility_id INT REFERENCES common_facilities(id) ON DELETE CASCADE,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    PRIMARY KEY (public_user_id, facility_id)
);

CREATE TYPE amenities_type AS ENUM('locker', 'parking spot', 'other');

CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    text_id TEXT NOT NULL, -- this isn't auto incremented and needs to be provided
    property_id INT REFERENCES property(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    fee NUMERIC(5, 2) NOT NULL,
    type amenities_type NOT NULL,
    UNIQUE (id, property_id)
);

CREATE TABLE holder_of (
    public_user_id INT REFERENCES public_users(id),
    amenities_id INT REFERENCES amenities(id),
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP DEFAULT NULL, -- null means current holder
    PRIMARY KEY (public_user_id, amenities_id)
);

CREATE TYPE priority AS ENUM('low', 'medium', 'high');

CREATE TABLE requests (
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    request_priority priority DEFAULT 'low',
    issued_at TIMESTAMP DEFAULT NOW(),
    complete_by TIMESTAMP, -- should this be required?
    condo_owner_id INT REFERENCES public_users(id),
    employee_id INT REFERENCES public_users(id),
    PRIMARY KEY (condo_owner_id, employee_id, title, issued_at) -- can a request be assigned to more than one employee?
);

CREATE TYPE file_type AS ENUM('declarations', 'annual budgets', 'board meeting minutes', 'other');

CREATE TABLE condo_management_files ( -- would a relation between requests and this table be useful?
    file_key TEXT PRIMARY KEY,
    file_type file_type DEFAULT 'other',
    company_id INT REFERENCES management_companies(id),
    description TEXT -- can be left empty maybe
);

/*
    For public users, should their username (display name) be unique? and what other
        fields should we store for them?

    For companies, should their company name be unique?

    more tables/fields needed for auth

    We assume a building can be owned by either a user or a company

    We further assume that a building is a condo unit ('property' table)

    For the 'employed_by' table, does it make sense to also store what building
    an employee works at?

    Should the common facilities table have a capacity field (which means that 
        many people can be there at once)?

    Should we add ar elation between requests and condo_management_files?
*/