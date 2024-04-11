import { Card, CardContent, Button } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from '@mui/joy/Typography';
// Define the type for each unit item
export interface Unit {
  id: string;
  property_id: string;
  unit_number: number;
  square_feet: number;
}

// Define the type for the props expected by UnitsCards
export interface UnitsProps {
  units: Unit[];
}

const UnitsCards: React.FC<UnitsProps> = ({ units }) => {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {units.map((unit) => (
        <Card key={unit.id} sx={{ mb: 2, width: 320 }}>
          <AspectRatio minHeight="120px" maxHeight="200px">
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
              alt=""
              loading="lazy"
            />
          </AspectRatio>
          <CardContent>
            <Typography level="title-lg" >Unit {unit.unit_number}</Typography> {/* Access unit_number property */}
            <Typography level="body-sm" >Square Feet: {unit.square_feet}</Typography> {/* Access square_feet property */}
           
            <Button
              variant="outlined"
              onClick={() => {
                /* Handle edit functionality */
              }}
            >
              Edit
            </Button>
          </CardContent>
        </Card>
      ))}
      </div>
    </>
  );
};

export default UnitsCards;
