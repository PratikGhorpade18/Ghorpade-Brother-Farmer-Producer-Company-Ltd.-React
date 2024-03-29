import React, { useEffect, useState } from "react";
import { Url } from "../../constants/APIUrl";
import { getAPICall,putAPICall,deleteAPICall } from "../../APIMethods/APIMethods";
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
  const [deletePopUp, setdeletePopUp] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [farmerDetails, setFarmerDetails] = useState({
    farmerId: "",
    fullName: "",
    mobileNumber: "",
    altMobileNumber: "",
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
    setFarmerId(data.farmerId); // Set the farmerId for editing
    setFarmerDetails({
      ...farmerDetails,
      farmerId: data.farmerId,
      fullName: data.fullName,
      mobileNumber: data.mobileNumber,
      altMobileNumber: data.altMobileNumber,
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
              onClick={() => {
                handleDeletePopUp(params.data.supBankId);
              }}
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
  const handleSubmitUpdate = () => {
    debugger
    console.log(farmerDetails)
    setEditModal(true);
    putAPICall(Url.updatefarmerId.replace('{farmerId}', farmerDetails?.farmerId), farmerDetails)
      .then((resp) => {
        console.log("edit", resp);
        alert("Farmer Details Updated Successfully!");
        setIsOpen(false); 
      })
      .catch((error) => {
        console.error("Error updating farmer:", error);
        alert("Failed to update farmer details.");
      });
  };

  const deletePopUpClose = () => {
    setdeletePopUp(false);
  };
  const handleDeletePopUp = (data) => {
    setFarmerId(data);
    setdeletePopUp(true);
  };
  const deleteFarmerOk = () => {
    debugger
    deleteAPICall(Url.deletefarmerId.replace("{farmerId}",  farmerDetails?.farmerId))
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          alert("Bank Deleted Successfully")
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert("Something Went Wrong !");
      });
    setdeletePopUp(false);
  };
  const handleOpen = () => {
    setEditModal(false);
   };
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 1500 }}>
      <div className="btn-wrap">
      <button onClick={handleOpen}>Add</button>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={onSearchTextChange}
      />
      </div>
     
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
          <h2>{editModal ? "Edit" : "Add"}Farmer Details</h2>
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
                value={farmerDetails.mobileNumber}
                onChange={(e) => handleInputChange(e.target, "mobileNumber")}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="altPhoneNumber">Alt Phone Number</label>
              <input
                type="text"
                id="altPhoneNumber"
                value={farmerDetails.altMobileNumber}
                onChange={(e) => handleInputChange(e.target, "altMobileNumber")}
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
              {/* <button onClick={handleSubmitUpdate}>Submit</button> */}


              <button
                className='BankListAddbtn'
                onClick={() => {
                  {
                    editModal ? handleSubmitUpdate() : handleSubmitUpdate();
                  }
                }}
              >
                {editModal ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </Modal>


      <Modal className='message-popup delete-popup'
              isOpen={deletePopUp}
              onRequestClose={deletePopUpClose}>
              <div >
                <p className='deletePopUpMessage'>Are you sure you want to delete this Bank?</p>
                <div className="deletePopUpBtn">
                  <button
                    type='button'
                    className='deletePopupOk deletePopupOk-sure'
                    onClick={deleteFarmerOk}
                  >
                    Yes 
                  </button>
                  <button className="deleteNo"
                    type='button'
                    onClick={deletePopUpClose} >  No  </button>

                </div>
              </div>
            </Modal>
    </div>
  );
}

export default FarmerList;
