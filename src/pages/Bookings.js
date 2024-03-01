



import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DataTable from "react-data-table-component";
import { getDownloadURL, getStorage, ref, uploadBytes, } from "firebase/storage";
import { firebaseApp } from "../Athentication/firebase/fbConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { get, getDatabase, set, ref as RTRef, child } from "firebase/database";
// import { getDatabase, ref, child, get } from "firebase/database";
import { RotatingSquare, Watch } from "react-loader-spinner";
import "./Driver.css"
import { useParams } from "react-router-dom";

const Bookings = () => {

    const id = useParams()
    console.log(id)
    const defaulturl = "https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"

    const initial = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""

    }
    const [inputDatas, setinputData] = useState(initial);
    const [image, setImage] = useState();
    const [isupdate, setisupdate] = useState(false);
    const [isimgupload, setisimgupload] = useState(false);

    const [compleData, setcompleData] = useState([]);
    const [onGoing, setOngoing] = useState([]);
    const [rejected, setRejected] = useState([]);

    // console.log("jfhxkvjh", compleData, onGoing, rejected)
    const [tabIndex, setTabIndex] = useState(0);

    console.log(compleData, "compleData")




    const [allLanguage, setAllLanguage] = useState([]);

    const [hide, setHide] = useState(true);
    // const [id, setId] = useState("");


    const GetPerticularData = (userId) => {


        setisupdate(true)
        const dbRef = RTRef(getDatabase());
        get(child(dbRef, 'users/' + userId)).then((snapshot) => {
            if (snapshot.exists()) {
                // const alldata = Object.values(snapshot.val());
                console.log(snapshot.val(), "pppe")
                // alert(alldata)
                return snapshot.val()
            }
        }).catch((error) => {
            alert(error)
        })

    }






    //fetchingAllDriverBookings
    const AllDriverBookings = () => {
        setisupdate(true);

        let completeAlldata = [];
        let onGoingAlldata = [];
        let rejectedAlldata = [];
        const dbRef = RTRef(getDatabase());

        get(child(dbRef, `DriverBookings/${id.id}`))

            .then((snapshot) => {

                if (snapshot.exists()) {
                    const alldata = Object.values(snapshot.val());
                    console.log(alldata, "llllw");

                    const completePromises = [];
                    const ongoingPromises = [];
                    const rejectedPromises = [];

                    // alldata.forEach((item) => {
                    // const completebookings = Object.values(item.CompletedBooking);
                    // const ongGoingData = Object.values(item.OngoingBooking);
                    // const rejectedData = Object.values(item.RejectedBooking);

                    const completebookings = alldata[0] ? Object.values(alldata[0]) : [];
                    completeAlldata = completebookings;
                    const rejectedData = alldata[2] ? Object.values(alldata[2]) : [];
                    rejectedAlldata = rejectedData;
                    const ongGoingData = alldata[1] ? Object.values(alldata[1]) : [];
                    onGoingAlldata = ongGoingData


                    completePromises.push(

                        ...completebookings.map((booking) => (

                            fetchData(dbRef, booking.userId, booking)
                        ))
                    );


                    console.log(completePromises)
                    ongoingPromises.push(
                        ...ongGoingData.map((booking) =>
                            fetchData(dbRef, booking.userId, booking)
                        )
                    );

                    rejectedPromises.push(
                        ...rejectedData.map((booking) =>
                            fetchData(dbRef, booking.userId, booking)
                        )
                    );


                    // });

                    return Promise.all([
                        Promise.all(completePromises),
                        Promise.all(ongoingPromises),
                        Promise.all(rejectedPromises),
                    ]);
                } else {
                    return [[], [], []];
                }
            })
            .then(([completeData, ongoingData, rejectedData]) => {
                // console.log({ main: completeAlldata, user: completeData })

                console.log(ongoingData, completeAlldata, "hhhh")

                const newcompleteData = completeAlldata.map((ele, id) => {

                    return {
                        ...ele,
                        id
                    }
                })
                const newconGoingData = onGoingAlldata.map((ele, id) => {

                    return {
                        ...ele,
                        id
                    }
                })

                // const newrejectedData = rejectedAlldata.map((ele, id) => {

                //     return {
                //         ...ele,
                //         id
                //     }
                // })
                setcompleData(completeAlldata.length ? [...newcompleteData, { "userData": completeData }] : []);
                setOngoing(onGoingAlldata.length ? [...newconGoingData, { "userData": ongoingData }] : []);

                //  setRejected([...newrejectedData, { "userData": rejectedData }]);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setisupdate(false);
            });
    };



    const fetchData = async (dbRef, userId, booking) => {
        const snapshot = await get(child(dbRef, 'users/' + userId));
        if (snapshot.exists()) {
            const userDatas = snapshot.val();
            return {
                starting: booking?.starting,
                ending: booking?.ending,
                otp: booking?.otp,
                status: booking?.status,
                time: booking.time,
                name: userDatas?.firstName + userDatas.lastName,
                image: userDatas?.image,
            };
        }
        return null;
    };





    useEffect(() => {
        AllDriverBookings()
    }, [])





    const completecolumns = [
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    SL
                </div>
            ),
            selector: (row) => row.id + 1

        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Distance
                </div>
            ),
            selector: (row) => row.distance,
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Profile pic
                </div>
            ),
            selector: (row) =>



                <img style={{ height: "80px", width: "80px" }}
                    src={row.image == "image" ? defaulturl : compleData[compleData?.length - 1]?.userData[row?.id]?.image
                        // src="#"
                    }
                />
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Starting Location
                </div>
            ),
            selector: (row) => row.starting,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Ending Location
                </div>
            ),
            selector: (row) => row.ending,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    OTP
                </div>
            ),
            selector: (row) => row.otp
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    status
                </div>
            ),
            selector: (row) => row.status
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Time
                </div>
            ),
            selector: (row) => row.time
        },

        // {
        //     name: (
        //         <div
        //             style={{
        //                 fontSize: "14px",
        //                 color: "#495057",
        //                 marginLeft: "15px",
        //                 fontWeight: "bolder",
        //             }}
        //         >
        //             Action
        //         </div>
        //     ),
        //     selector: (row) => row.action,
        // },
    ];


    const tabheading = [
        "Ongoing",
        "Completed",
        // "Rejected",

    ];



    const tablistData = [
        <>
            <div
                style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#868e96",
                    margin: "35px",
                }}
                className="card-title"
            >
                Ongoing Bookings
            </div>

            <DataTable columns={completecolumns} data={onGoing} pagination />
        </>,
        <>
            <div
                style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#868e96",
                    margin: "35px",
                }}
                className="card-title"
            >
                Completed Bookings
            </div>

            <DataTable columns={completecolumns} data={compleData} pagination />
        </>,
        <>
            <div
                style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#868e96",
                    margin: "35px",
                }}
                className="card-title"
            >
                Deleted Bookings
            </div>

            {/* <DataTable columns={completecolumns} data={rejected} pagination /> */}
        </>
    ]

    // const data = useMemo(() => {
    //     const jsx = tablistData.map((ele) => {
    //         return (<TabPanel>
    //             {ele}
    //         </TabPanel>)
    //     })
    //     return jsx

    // }, [compleData])

    // console.log(compleData, "kkkkk")

    return (
        <>

            <div className="main_wrap">
                <div className="container-fluid">



                    <div component="div" className="TabsAnimation appear-done enter-done">
                        <div className="main-card mb-3 card">
                            <div className="card-body">

                                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                                    <TabList>
                                        {tabheading.map((ele) => {
                                            return (<Tab>{ele}</Tab>)
                                        })}
                                    </TabList>

                                    {tablistData.map((ele) => {
                                        return (<TabPanel>
                                            {ele}
                                        </TabPanel>)
                                    })}

                                    {/* {data} */}
                                </Tabs>




                            </div>
                        </div>
                    </div>
                </div></div>

            {
                isupdate &&
                <div className="loadingBar"><Watch
                    visible={true}
                    height="100"
                    width="1600"
                    color="black"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                </div>
            }
        </>
    );
};

export default Bookings;
