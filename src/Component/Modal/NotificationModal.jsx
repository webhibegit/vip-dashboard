import React from 'react'
import a from "../../Images/profile-pic.png";
import b from "../../Images/Icon.png"

function NotificationModal({closeModal}) {
  return (
    <>
    <section className='notificationmodal_main'>
                <div className='notification_modal'>
                    <div className='notification_overlay'></div>
                    <div className='notification_content'>
                        <p className='notification_txt'>Notification</p>
                        <div className='closemark' onClick={()=>closeModal(false)}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className='notification_all_main'>
                              <div className='notification_all_flx'>
                                <div className='notification_img'>
                                    <img src={a} alt="/" />
                                </div>
                                <div className='notification_details'>
                                    <h3>Jerremy Hage</h3>
                                    <p>You have requested a partial payment of £200 for Project Name 1</p>
                                    <p>Jun 23, 2023 at 21:22 Pm</p>
                                    <h5>Waiting for Response</h5>
                                </div>
                              </div>

                              <div className='notification_all_flx'>
                                <div className='notification_img'>
                                    <img src={a} alt="/" />
                                </div>
                                <div className='notification_details'>
                                    <h3>Jerremy Hage</h3>
                                    <p>You have requested a partial payment of £200 for Project Name 1</p>
                                    <p>Jun 23, 2023 at 21:22 Pm</p>
                                    <h5>Waiting for Response</h5>
                                </div>
                              </div>

                              <div className='notification_all_flx'>
                                <div className='notification_img'>
                                    <img src={a} alt="/" />
                                </div>
                                <div className='notification_details'>
                                    <h3>Jerremy Hage</h3>
                                    <p>You have requested a partial payment of £200 for Project Name 1</p>
                                    <p>Jun 23, 2023 at 21:22 Pm</p>
                                    <h5>Waiting for Response</h5>
                                </div>
                              </div>

                              <div className='notification_all_flx'>
                                <div className='notification_img'>
                                    <img src={a} alt="/" />
                                </div>
                                <div className='notification_details'>
                                    <h3>Jerremy Hage</h3>
                                    <p>You have requested a partial payment of £200 for Project Name 1</p>
                                    <p>Jun 23, 2023 at 21:22 Pm</p>
                                    <h5>Waiting for Response</h5>
                                </div>
                              </div>
                              <div className='notification_all_flx'>
                                <div className='notification_img'>
                                    <img src={a} alt="/" />
                                </div>
                                <div className='notification_details'>
                                    <h3>Jerremy Hage</h3>
                                    <p>You have requested a partial payment of £200 for Project Name 1</p>
                                    <p>Jun 23, 2023 at 21:22 Pm</p>
                                    <h5>Waiting for Response</h5>
                                </div>
                              </div>
                              <div className='notification_all_flx'>
                                <div className='notification_img'>
                                    <img src={b} alt="/" />
                                </div>
                                <div className='notification_details'>
                                    <h3>Lorem ipsum dolor sit amet</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                    <p>Jun 23, 2023 at 21:22 Pm</p>
                                    
                                </div>
                              </div>
                              <div className='notification_all_flx'>
                                <div className='notification_img'>
                                    <img src={b} alt="/" />
                                </div>
                                <div className='notification_details'>
                                <h3>Lorem ipsum dolor sit amet</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                    <p>Jun 23, 2023 at 21:22 Pm</p>
                                </div>
                              </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default NotificationModal