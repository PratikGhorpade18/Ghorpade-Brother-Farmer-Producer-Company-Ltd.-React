import React, { useEffect, useState } from "react";
import { Url } from "../../constants/APIUrl";
import { getAPICall } from "../../APIMethods/APIMethods";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import Modal from 'react-modal';
import '../FarmerList/FarmerList.css'
function FarmerList() {             
  const [rowData, setRowData] = useState([]);                                  
  const [searchText, setSearchText] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    getAPICall(Url.getAllFarmer)                                                       
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handelEditFarmerList = (data) => {

  }
  const columnDefs = [
    { headerName:"farmer Id", field: "farmerId" },
    { headerName:"Full Name", field: "fullName" },
    { headerName:"Address", field: "address" },
    { headerName:"Phone Number", field: "mobileNumber" },
    { headerName:"Alt Phone Number", field: "altMobileNumber" },
    { headerName:"Adhar Number", field: "adharNumber" },
    {
      headerName: "Action",
      cellRenderer: (params) => {
        console.log("params", params);
        return (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              type='button'
              className='EditBtn'onClick={openModal}
             
            >
              {" "}
              <LuPencil />
            </button>
            <button
              type='button'
              className='   DeleteBtn'
              onClick={() => {
                handelEditFarmerList()
               }}
            >
              {" "}
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


  function openModal() {
    setIsOpen(true);
  }

 
  function closeModal() {
    setIsOpen(false);
  }

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
<Modal  className="modal"
        isOpen={modalIsOpen}
         onRequestClose={closeModal}
         contentLabel="farmerList">
        <div className="modal-header"> 
        <h2>Hello</h2>
        <button onClick={closeModal}>X</button>
        </div>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
  </div>
  );
}

export default FarmerList;
