import React, { useEffect, useState } from "react";
import { Url } from "../../constants/APIUrl";
import { getAPICall } from "../../APIMethods/APIMethods";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import Modal from 'react-modal';
import '../FarmerList/FarmerList.css';

function FarmerList() {
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [farmerId, setFarmerId] = useState("");
  const [farmerDetails, setFarmerDetails] = useState({
    farmerId: "",
    fullName: "",
    phoneNumber: "",
    altPhoneNumber: "",
    adharNumber: "",
    address: "",
  });

  useEffect(() => {
    getAPICall(Url.getAllFarmer)
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditFarmerList = (data) => {
    setFarmerDetails({
      ...farmerDetails,
      farmerId: data.farmerId,
      fullName: data.fullName,
      phoneNumber: data.mobileNumber,
      altPhoneNumber: data.altMobileNumber,
      adharNumber: data.adharNumber,
      address: data.address,
    });
    setIsOpen(true);
  }

  const columnDefs = [
    { headerName: "Farmer Id", field: "farmerId" },
    { headerName: "Full Name", field: "fullName" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone Number", field: "mobileNumber" },
    { headerName: "Alt Phone Number", field: "altMobileNumber" },
    { headerName: "Adhar Number", field: "adharNumber" },
    {
      headerName: "Action",
      cellRenderer: (params) => {
        return (
          <div style={{ textAlign: "center" }}>
            <button
              className='EditBtn'
              onClick={() => handleEditFarmerList(params.data)}
            >
              <LuPencil />
            </button>
            <button
              className='DeleteBtn'
             >
              <MdDeleteOutline />
            </button>
          </div>
        );
      },
      flex: 0.3,
    },
  ];

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e, field) => {
    const value = e.value;
    setFarmerDetails({
      ...farmerDetails,
      [field]: value,
    });
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 1500 }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={onSearchTextChange}
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        quickFilterText={searchText}
      />
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="farmerList"
      >
        <div className="modal-header">
          <h2>Edit Farmer Details</h2>
          <button onClick={closeModal}>X</button>
        </div>
        <form>
          <div className="farmer-detail">
            <div className="input-wrap">
              <label htmlFor="farmerId">Farmer Id</label>
              <input
                type="text"
                id="farmerId"
                value={farmerDetails.farmerId}
                onChange={(e) => handleInputChange(e.target, "farmerId")}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={farmerDetails.fullName}
                onChange={(e) => handleInputChange(e.target, "fullName")}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                value={farmerDetails.phoneNumber}
                onChange={(e) => handleInputChange(e.target, "phoneNumber")}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="altPhoneNumber">Alt Phone Number</label>
              <input
                type="text"
                id="altPhoneNumber"
                value={farmerDetails.altPhoneNumber}
                onChange={(e) => handleInputChange(e.target, "altPhoneNumber")}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="adharNumber">Adhar Number</label>
              <input
                type="text"
                id="adharNumber"
                value={farmerDetails.adharNumber}
                onChange={(e) => handleInputChange(e.target, "adharNumber")}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={farmerDetails.address}
                onChange={(e) => handleInputChange(e.target, "address")}
              />
            </div>
            <div className="submitbtn-wrap">
              <button>Submit</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default FarmerList;
