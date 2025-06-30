import React, { useState, useRef, useContext } from 'react';
import {
  FiBox,
  FiShoppingCart,
  FiCheckCircle,
  FiLogOut,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiImage,
  FiSave,
  FiX,
  FiClock,
  FiDollarSign
} from 'react-icons/fi';
import { BikeContext } from '../context/BikeContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const { bikeHistory = [], removeBike } = useContext(BikeContext);
  const [showSuccess, setShowSuccess] = useState(false);

  const [gearItems, setGearItems] = useState([
    {
      id: 1,
      name: 'Helmet',
      price: 3500,
      stock: 10,
      description: 'Premium motorcycle helmet',
      image: 'https://images.unsplash.com/photo-1551218372-a32e3855f734?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Gloves',
      price: 2000,
      stock: 15,
      description: 'Leather riding gloves',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ]);

  const [cart, setCart] = useState([
    {
      id: 1,
      gearId: 1,
      item: 'Helmet',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1551218372-a32e3855f734?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 2,
      status: 'pending'
    }
  ]);

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  // Calculate total amount spent on gear and bikes
  const totalSpentOnGear = purchaseHistory.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const totalSpentOnBikes = bikeHistory.reduce((total, bike) => total + bike.price, 0);

  const fulfillOrder = (cartItemId) => {
    const itemToFulfill = cart.find(item => item.id === cartItemId);
    if (!itemToFulfill) return;

    // Check if gear exists, if not add it to inventory
    const existingGear = gearItems.find(item => item.id === itemToFulfill.gearId);
    if (!existingGear) {
      setGearItems([
        ...gearItems,
        {
          id: itemToFulfill.gearId,
          name: itemToFulfill.item,
          price: itemToFulfill.price,
          stock: itemToFulfill.quantity,
          description: 'Added from fulfilled order',
          image: itemToFulfill.image
        }
      ]);
    } else {
      // Update stock if gear exists
      setGearItems(gearItems.map(gear =>
        gear.id === itemToFulfill.gearId
          ? { ...gear, stock: gear.stock + itemToFulfill.quantity }
          : gear
      ));
    }

    // Add to purchase history
    const fulfilledItem = {
      ...itemToFulfill,
      status: 'fulfilled',
      fulfillmentDate: new Date().toLocaleDateString()
    };
    
    setPurchaseHistory([...purchaseHistory, fulfilledItem]);
    setCart(cart.filter(item => item.id !== cartItemId));

    toast.success(`Order for ${itemToFulfill.quantity}x ${itemToFulfill.item} fulfilled successfully!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleRemoveBike = (bikeId) => {
    if (window.confirm("Are you sure you want to remove this bike from your purchases?")) {
      removeBike(bikeId);
      toast.info("Bike removed from your purchases", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const addGear = () => {
    const newId = gearItems.length > 0 ? Math.max(...gearItems.map(item => item.id)) + 1 : 1;
    setGearItems([
      ...gearItems,
      {
        id: newId,
        name: 'New Gear',
        price: 0,
        stock: 0,
        description: '',
        image: ''
      }
    ]);
    setEditingId(newId);
  };

  const saveGear = (id) => {
    const name = document.querySelector(`input[name="gear-name-${id}"]`)?.value;
    const price = parseFloat(document.querySelector(`input[name="gear-price-${id}"]`)?.value) || 0;
    const stock = parseInt(document.querySelector(`input[name="gear-stock-${id}"]`)?.value) || 0;
    const description = document.querySelector(`textarea[name="gear-desc-${id}"]`)?.value;

    setGearItems(gearItems.map(item =>
      item.id === id ? { ...item, name, price, stock, description } : item
    ));
    setEditingId(null);
    
    toast.info(`Gear item "${name}" updated successfully!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const deleteGear = (id) => {
    const itemToDelete = gearItems.find(item => item.id === id);
    if (itemToDelete) {
      if (window.confirm(`Are you sure you want to delete "${itemToDelete.name}"?`)) {
        setGearItems(gearItems.filter(item => item.id !== id));
        toast.error(`Gear item "${itemToDelete.name}" deleted!`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const formatPrice = (price) => {
    return `Ksh ${price.toLocaleString()}`;
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <aside className="col-md-3 col-lg-2 bg-light d-none d-md-block p-4 border-end">
          <h2 className="h4 fw-bold mb-4">Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="#gear" className="nav-link d-flex align-items-center gap-2 text-dark">
                <FiBox className="fs-5" />
                <span>My Gear</span>
                <span className="badge bg-primary rounded-pill ms-auto">
                  {gearItems.length}
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#cart" className="nav-link d-flex align-items-center gap-2 text-dark">
                <FiShoppingCart className="fs-5" />
                <span>Orders to Fulfill</span>
                {cart.length > 0 && (
                  <span className="badge bg-danger rounded-pill ms-auto">{cart.length}</span>
                )}
              </a>
            </li>
            <li className="nav-item">
              <a href="#history" className="nav-link d-flex align-items-center gap-2 text-dark">
                <FiCheckCircle className="fs-5" />
                <span>Purchase History</span>
              </a>
            </li>
            {bikeHistory.length > 0 && (
              <li className="nav-item">
                <a href="#bikes" className="nav-link d-flex align-items-center gap-2 text-dark">
                  <FiCheckCircle className="fs-5" />
                  <span>Bikes Purchased</span>
                  <span className="badge bg-success rounded-pill ms-auto">
                    {bikeHistory.length}
                  </span>
                </a>
              </li>
            )}
            <li className="nav-item mt-4">
              <div className="p-3 bg-white rounded border mb-3">
                <small className="text-muted">Total spent</small>
                <h4 className="fw-bold text-success">
                  <FiDollarSign className="me-1" />
                  {formatPrice(totalSpentOnGear + totalSpentOnBikes)}
                </h4>
                <small className="text-muted d-block">
                  {gearItems.length} gear items • {bikeHistory.length} bikes
                </small>
              </div>
            </li>
            <li className="nav-item mt-2">
              <button
                onClick={() => console.log("Logout")}
                className="btn btn-link nav-link text-danger d-flex align-items-center gap-2"
              >
                <FiLogOut className="fs-5" />
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main */}
        <main className="col-md-9 col-lg-10 p-4">
          {/* Gear Section */}
          <section id="gear" className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>My Gear Inventory</h2>
              <button onClick={addGear} className="btn btn-primary">
                <FiPlus className="me-1" /> Add Gear
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gearItems.map(item => (
                    <tr key={item.id}>
                      <td style={{ width: '100px' }}>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-thumbnail"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="bg-light d-flex align-items-center justify-content-center"
                               style={{ width: '80px', height: '80px' }}>
                            <FiImage size={24} className="text-muted" />
                          </div>
                        )}
                      </td>
                      <td>
                        {editingId === item.id ? (
                          <input 
                            name={`gear-name-${item.id}`} 
                            type="text" 
                            className="form-control form-control-sm" 
                            defaultValue={item.name} 
                          />
                        ) : item.name}
                      </td>
                      <td>
                        {editingId === item.id ? (
                          <input 
                            name={`gear-price-${item.id}`} 
                            type="number" 
                            className="form-control form-control-sm" 
                            defaultValue={item.price} 
                          />
                        ) : formatPrice(item.price)}
                      </td>
                      <td>
                        {editingId === item.id ? (
                          <input 
                            name={`gear-stock-${item.id}`} 
                            type="number" 
                            className="form-control form-control-sm" 
                            defaultValue={item.stock} 
                          />
                        ) : item.stock}
                      </td>
                      <td>
                        {editingId === item.id ? (
                          <textarea 
                            name={`gear-desc-${item.id}`} 
                            className="form-control form-control-sm" 
                            defaultValue={item.description} 
                            rows={2} 
                          />
                        ) : <small className="text-muted">{item.description}</small>}
                      </td>
                      <td>
                        {editingId === item.id ? (
                          <div className="d-flex gap-2">
                            <button onClick={() => saveGear(item.id)} className="btn btn-success btn-sm">
                              <FiSave size={14} />
                            </button>
                            <button onClick={() => setEditingId(null)} className="btn btn-secondary btn-sm">
                              <FiX size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex gap-2">
                            <button onClick={() => setEditingId(item.id)} className="btn btn-outline-primary btn-sm">
                              <FiEdit size={14} />
                            </button>
                            <button onClick={() => deleteGear(item.id)} className="btn btn-outline-danger btn-sm">
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Orders */}
          <section id="cart" className="mb-5">
            <h2>Orders to Fulfill</h2>
            <small className="text-muted">{cart.length} pending orders</small>
            {cart.length === 0 ? (
              <div className="alert alert-info mt-3">
                No pending orders to fulfill.
              </div>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id}>
                        <td className="d-flex align-items-center gap-3">
                          <div style={{ width: '60px', height: '60px' }}>
                            {item.image ? (
                              <img src={item.image} alt={item.item} className="img-thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '100%', height: '100%' }}>
                                <FiImage size={18} className="text-muted" />
                              </div>
                            )}
                          </div>
                          <span>{item.item}</span>
                        </td>
                        <td>{formatPrice(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            <FiClock className="me-1" /> Pending
                          </span>
                        </td>
                        <td>
                          <button 
                            onClick={() => fulfillOrder(item.id)} 
                            className="btn btn-success btn-sm"
                          >
                            Mark as Fulfilled
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Purchase History */}
          <section id="history" className="mb-5">
            <h2>Purchase History</h2>
            <small className="text-muted">{purchaseHistory.length} completed orders</small>
            {purchaseHistory.length === 0 ? (
              <div className="alert alert-info mt-3">
                No purchase history yet.
              </div>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Date Fulfilled</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseHistory.map(item => (
                      <tr key={item.id}>
                        <td className="d-flex align-items-center gap-3">
                          <div style={{ width: '60px', height: '60px' }}>
                            {item.image ? (
                              <img src={item.image} alt={item.item} className="img-thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '100%', height: '100%' }}>
                                <FiImage size={18} className="text-muted" />
                              </div>
                            )}
                          </div>
                          <span>{item.item}</span>
                        </td>
                        <td>{formatPrice(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td className="fw-bold">{formatPrice(item.price * item.quantity)}</td>
                        <td>{item.fulfillmentDate}</td>
                        <td>
                          <span className="badge bg-success">
                            <FiCheckCircle className="me-1" /> Fulfilled
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Bikes from Context */}
          {bikeHistory.length > 0 && (
            <section id="bikes" className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Bikes Purchased</h2>
                <small className="text-muted">{bikeHistory.length} bikes</small>
              </div>
              <div className="row">
                {bikeHistory.map(bike => (
                  <div key={bike.id} className="col-md-4 mb-4">
                    <div className="card shadow-sm h-100">
                      <div className="card-img-top" style={{ height: '200px', overflow: 'hidden' }}>
                        {bike.image ? (
                          <img 
                            src={bike.image} 
                            alt={`${bike.brand} ${bike.model}`} 
                            className="img-fluid w-100 h-100" 
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="bg-light d-flex align-items-center justify-content-center h-100">
                            <FiImage size={48} className="text-muted" />
                            <span className="ms-2">No image available</span>
                          </div>
                        )}
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <h5 className="card-title">{bike.brand} {bike.model}</h5>
                          <button 
                            onClick={() => handleRemoveBike(bike.id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        <p className="card-text mb-1"><strong>Year:</strong> {bike.year}</p>
                        <p className="card-text mb-1"><strong>Mileage:</strong> {bike.mileage.toLocaleString()} km</p>
                        <p className="card-text mb-1"><strong>Location:</strong> {bike.location}</p>
                        <p className="fw-bold text-success">{formatPrice(bike.price)}</p>
                        <span className="badge bg-success mt-2">
                          <FiCheckCircle className="me-1" /> Paid
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;