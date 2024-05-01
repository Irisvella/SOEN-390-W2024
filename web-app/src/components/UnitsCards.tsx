import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
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
  const [openDialog, setOpenDialog] = useState<boolean>(false); // State to manage dialog visibility
  const [currentKey, setCurrentKey] = useState<string>(""); // State to store the current key
  const [unitsWithKeys, setUnitsWithKeys] = useState<Unit[]>(units);
  
  const token = localStorage.getItem('token'); 
  const generateKey = async (unitId: string) => {
    const response = await fetch('https://estate-api-production.up.railway.app/registration', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'renter',
        condoId: unitId, 
      }),
    });

    if (!response.ok) {
      console.error("Error generating key");
      return;
    }

    const data = await response.json();
    console.log(data.data);
    setCurrentKey(data.data.registrationKey); // Set the current key
    setOpenDialog(true); // Show the dialog
    // Update the units state with the new key
    setUnitsWithKeys(unitsWithKeys.map(unit => 
      unit.id === unitId ? { ...unit, registrationKey: data.registrationKey } : unit
    ));
  };
  const handleClose = () => {
    setOpenDialog(false);
  };


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
            <Button
            variant = "outlined"
            onClick={() =>{
              generateKey(unit.id);
            }}>
              Generate Key
            </Button>
          </CardContent>
        </Card>
      ))}
      </div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Generated Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentKey}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UnitsCards;
