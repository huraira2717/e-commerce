import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Dialog , DialogContent } from '@mui/material';


const UserCard = ({ user }) => (
  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        title="green iguana"
      > {user.image && <img src={user.image} alt='/static/images/cards/contemplative-reptile.jpg' className='h-[20vh] w-full mb-5'/>} </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{font:'bold'}}>
        {user.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
);

const UserList = ({ users }) => (
  <div className="w-[40%]">
    {users.map((user) => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>
);


function Cards() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    // Fetch user data from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    // Fetch product data from local storage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProduct(storedProducts);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addUser = (e) => {
    e.preventDefault();

    const newUser = {
      id: users.length + 1,
      name: userName,
      desc: desc,
      price: price,
      image: userImage,
      product: product,
    };

    setUsers([...users, newUser]);
    setUserName("");
    setDesc("");
    setPrice("");
    setUserImage(null);

    const findProduct = product.find((value) => value.product === product);

    if (!findProduct) {
      const newProduct = { product, userImage, desc, price };
      setProduct([...product, newProduct]); // Update product state
      localStorage.setItem("products", JSON.stringify([...product, newProduct])); // Update local storage
    } else {
      console.log("Existing product");
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const ModalClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={openModal}>
        Add Product
      </Button>

      <Dialog open={open} onClose={ModalClose}>
        <DialogContent>
          {/* Modal content here */}
          <TextField
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button variant="contained" onClick={addUser}>
            Add User
          </Button>
        </DialogContent>
      </Dialog>

      <UserList users={users} />
    </div>
  );
}

export default Cards;
