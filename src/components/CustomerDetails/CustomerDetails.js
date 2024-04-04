import React, { useEffect, useState } from "react";
import '../CustomerDetails/CustomerDetails.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Url } from "../../constants/APIUrl";
import { deleteAPICall, getAPICall, putAPICall } from "../../APIMethods/APIMethods";
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import Modal from 'react-modal';


function CustomerDetails() {
    const [rowData, setRowData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);
    const [editModal, seteditModal] = useState(false);
    const [customerId, setcustomerId]= useState('');
    const [deletePopUp,setdeletePopUp]=useState(false);
    const [customerDetails,setcustomerDetails]= useState({
      customerName:'',
      officeContactNumber: "",
      contactPersonName:"",
      contactPersonMobileNubmber:"",
      emailId:"",
      address:""

    })
    const handleInputChange = (e, field) => {
      const value = e.value;
      setcustomerDetails({
        ...customerDetails,
        [field]: value,
      });
    };

    const columnDefs = [
        { headerName: "Sr.No.",
        valueGetter: "Number(node.id)+1",
        headerClass: 'ag-header-cell-center'
           },
        { headerName: "Customer Name",
         field: "customerName",
         headerClass: 'ag-header-cell-center'
         },
        { headerName: "Office Contact Number", 
        field: "officeContactNumber",
        headerClass: 'ag-header-cell-center'
       },
        { headerName: "Contact Person Name",
         field: "contactPersonName",
         headerClass: 'ag-header-cell-center'
       },
        { headerName: "Contact Person Mobile Number",
         field: "contactPersonMobileNubmber",
         headerClass: 'ag-header-cell-center'
         },
        { headerName: "Email Id",
         field: "emailId",
         headerClass: 'ag-header-cell-center'
         }, 
        { headerName: "Address",
         field: "address",
         headerClass: 'ag-header-cell-center'
         } ,
        {
            headerName: "Action",
            headerClass: 'ag-header-cell-center',
            cellRenderer: (params) => {
              return (
       <div style={{ textAlign: "center" }}>
         <button                   
           className='EditBtn'
           onClick={() => handleEditCustomerList(params.data)}

           >
           <LuPencil />
         </button>
         <button
           className='DeleteBtn'
           onClick={() => handleDeleteCustomerList(params.data)}

           >
           <MdDeleteOutline />
         </button>
       </div>
              );
            },
            flex: 0.3,
          },
        ];
 

    useEffect(() => {

        getAPICall(Url.geAllCustomer)
            .then((data) => {
                console.log(data);
                setRowData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [modalIsOpen]);

    const handleSubmit = async(e) => {
      e.preventDefault();  
      const Token = sessionStorage.getItem("Authorize");
      const response = await fetch(Url.addCustomer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + Token,
        },
        body: JSON.stringify(customerDetails),
      });
      const result = await response.json();
      console.log("Success:", result);
      
        setModalOpen(false);
       
       setcustomerDetails({
        customerName:'',
        officeContactNumber: "",
        contactPersonName:"",
        contactPersonMobileNubmber:"",
        emailId:"",
        address:""
      });
    }
    const handleEditCustomerList=(data)=>{
      debugger;
       setModalOpen(true);
      seteditModal(true);
      
      getAPICall(Url.getcustomerId.replace("{customerId}", data.customerId))
      .then((resp) => {
        setcustomerId(resp.customerId);
        setcustomerDetails({
          ...customerDetails,
          customerName:resp.customerName,
          officeContactNumber: resp.officeContactNumber,
          contactPersonName:resp.contactPersonName,
          contactPersonMobileNubmber:resp.contactPersonMobileNubmber,
          emailId:resp.emailId,
          address:resp.address

        })
       })


    }
    const handleSubmitUpdate = (e) =>{
      debugger
      seteditModal(true);
      putAPICall(Url.updatecustomerId.replace("{customerId}",customerId),customerDetails)
      .then((resp)=>{
        console.log("edit", resp);
        handleClose()
        alert("Bank Details Updated Successfully !!!!!")
      })
    }
const handleDeleteCustomerList=(data)=>{
  setcustomerId(data.customerId);
  setdeletePopUp(true);
}

const deleteBankOk=()=>{
  debugger
  deleteAPICall(Url.deleteCustomerId.replace("{customerId}",customerId))
  .then((resp)=>{
    console.log(resp);
    if (resp.success === true) {
      alert("Farmer Deleted Successfully");
    } else {
      alert(resp.message);
    }
  })
  .catch((err) => {
    console.log(err.message);
    alert("Something Went Wrong !");
  });
setdeletePopUp(false);
}
    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
      };


      const deletePopUpClose =()=>{
        setdeletePopUp(false)
      }
      const handleOpen = () => {
     
        setModalOpen(true);
     
       };
      const handleClose = () => {
     
        setModalOpen(false);
            };

    return (
        <div className=" "> 
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
                    columnDefs={columnDefs}
                    rowData={rowData}>
                </AgGridReact>
                <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={handleClose}
        contentLabel="farmerList"
      >
        <div className="modal-header">
 <h2>Customer Details</h2>
 <button onClick={handleClose}>X</button>
        </div>
        <div className="modal-body customerDetail">
        <div className="input-wrap">
     <label htmlFor="fullName">Customer Name</label>
     <input
       type="text"
       id="customerName"
       value={customerDetails.customerName}
       onChange={(e) => handleInputChange(e.target, "customerName")}
      />
   </div>         
        <div className="input-wrap">
     <label htmlFor="fullName">Office Contact Number</label>
     <input
       type="text"
       id="customerName"
       value={customerDetails.officeContactNumber}
       onChange={(e) => handleInputChange(e.target, "officeContactNumber")}
      />
   </div>         
        <div className="input-wrap">
     <label htmlFor="fullName">Contact Person Name</label>
     <input
       type="text"
       id="customerName"
       value={customerDetails.contactPersonName}
       onChange={(e) => handleInputChange(e.target, "contactPersonName")}
      />
   </div>         
        <div className="input-wrap">
     <label htmlFor="fullName">Contact Person Mobile NUmber</label>
     <input
       type="text"
       id="customerName"
       value={customerDetails.contactPersonMobileNubmber}
       onChange={(e) => handleInputChange(e.target, "contactPersonMobileNubmber")}
      />
   </div>         
        <div className="input-wrap">
     <label htmlFor="fullName">Email Id</label>
     <input
       type="text"
       id="customerName"
       value={customerDetails.emailId}
       onChange={(e) => handleInputChange(e.target, "emailId")}
      />
   </div>         
        <div className="input-wrap">
     <label htmlFor="fullName">Address</label>
     <input
       type="text"
       id="customerName"
       value={customerDetails.address}
       onChange={(e) => handleInputChange(e.target, "address")}
      />
   </div>     
                   </div>
   <button   onClick={(e) => {
          {
            editModal ? handleSubmitUpdate() : handleSubmit(e);
                   }
       }}>{editModal ? "Edit": "Add"}</button>    
        <form>
 
        </form>
      </Modal>
      <Modal className='message-popup delete-popup'
              isOpen={deletePopUp}
              onRequestClose={deletePopUpClose}
            >
              <div >
                <p className='deletePopUpMessage'>Are you sure you want to delete this Bank?</p>
                <div className="deletePopUpBtn">
                  <button
                    type='button'
                    className='deletePopupOk deletePopupOk-sure'
                    onClick={deleteBankOk}
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
        </div>
    );
}

export default CustomerDetails;
