import React from 'react'
import ReactModal from 'react-modal'
import Lottie from 'lottie-react'
import successLottie from'../../assets/lottie/Successfully.json'
import deleteLottie from '../../assets/lottie/Delete.json'
import wrongLottie from '../../assets/lottie/oopsLottie.json'
import './Popup.css'


const Popup = (props) => {
    console.log("props",props);
  return (
    <ReactModal className={`message-popup ${props.deleteMsg  ? 'delete-successfully': props.wrongMsg?'delete-successfully': ''}`}
              isOpen={props.isOpen}
              onRequestClose={props.onRequestClose}
            >
              <div className='success-modal-body'>                                                      
               <div className="bankLottiefile">
               {props.successMsg == true ? <Lottie animationData={successLottie}  />  :props.wrongMsg == true ? <Lottie animationData={wrongLottie}  />  : props.deleteMsg == true ? <Lottie animationData={deleteLottie}  /> : <></>}
              </div>
               <div className="deletePopUpMessage">
             {/* {props.successMsg == true ? <Lottie animationData={Sucess} style={style} /> : props.paymentMsg == true ? <Lottie animationData={Payment} style={style} /> : props.wrongMsg == true ? <Lottie animationData={Warning} style={style} /> : props.deleteMsg == true ? <Lottie animationData={Delete} style={style} /> : <></>} */}
             {props.CongratulationMsg==true?<span style={{ textAlign: 'center' }}>{props.errorMsg1}</span>:<></>}
             <span className='msgShow' style={{ textAlign: 'center' }}>{props.errorMsg}</span>
            <small className='hintText'>{props.hintText}</small>
              {/* <button style={{display:props.okBtnHide == true ? "none" : "", width:props?.btnWidth ? props?.btnWidth : "80px" }} onClick={props?.okBtnFunCondition ? props.modelOkBtnFun : props.onRequestClose} className="ModalBtn"> {props.modalBtnMessage ? props.modalBtnMessage : "Ok"} </button> */}
            </div>
                <button
                  type='button'
                  className='deletePopupOk'
                  onClick={props.onRequestClose}
                >
                  Ok
                </button>
              </div>
            </ReactModal>
  )
}

export default Popup