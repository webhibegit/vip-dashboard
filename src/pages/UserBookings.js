



import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";
import { getDownloadURL, getStorage, ref, uploadBytes, } from "firebase/storage";
import { firebaseApp } from "../Athentication/firebase/fbConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { get, getDatabase, set, ref as RTRef, child, remove, update } from "firebase/database";
// import { getDatabase, ref, child, get } from "firebase/database";
import { moveRecord, searchUsersByBookingTime } from "../Utility/firebase";
import { RotatingSquare, Watch } from "react-loader-spinner";
import "./Driver.css"
import moment from "moment";
import { useParams } from "react-router-dom";

const UserBookings = () => {



    const defaulturl = "https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"

    const [isupdate, setisupdate] = useState(false);
    const [isimgupload, setisimgupload] = useState(false);
    const [allDatas, setAllDatas] = useState([]);
    const [rowNo, setrowNo] = useState("");

    const [userId, setuserId] = useState("");







    const [allLanguage, setAllLanguage] = useState([]);

    const [isAssign, setisAssign] = useState(true);
    const [arrUpcomingBookings, setArrUpcomingBookings] = useState([])
    const [arrDrivers, setArrDrivers] = useState()





    function parseDateTime(dateTimeString) {
        const parsedDateTime = moment(dateTimeString);

        // Extracting date and time
        const date = parsedDateTime.format("YYYY-MM-DD");
        const time = parsedDateTime.format("HH:mm:ss");

        return { date, time };
    }


    //Fetch All Drivers
    const fetchAllDrivers = () => {
        const dbRef = RTRef(getDatabase());
        get(child(dbRef, `drivers/`)).then((snapshot) => {
            if (snapshot.exists()) {

                // const apiData = Object.values(snapshot.val());
                const dataArray = Object.entries(snapshot.val()).map(([key, value]) => ({ key, ...value }));
                console.log("HDHD84", dataArray);
                // setArrDrivers(apiData)
                setArrDrivers(dataArray)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            setisupdate(false)
            console.error(error);
        })
    }


    //fetchingAllUsersBookings
    const allUsers = () => {
        setisupdate(true)
        const dbRef = RTRef(getDatabase());
        console.log(dbRef, "jhgjfgjkl")
        get(child(dbRef, `UserBookings/Upcomming/`)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log("HDHD81", snapshot.val());
                const apiDataRaw = Object.values(snapshot.val());
                const apiData = Object.entries(apiDataRaw).map(([key, value]) => ({ key, ...value }));

                // const flatApiData = apiData.flat();

                // console.log("LNE109", apiData);

                // console.log("LINE121", snapshot.val());

                // Convert the data to a flat array of booking objects
                const flattenedArray = apiData.flatMap((bookingGroup, index) => {
                    return Object.entries(bookingGroup).map(([bookingId, bookingDetails]) => ({
                        id: index.toString() + '-' + bookingId, // Combine the array index with bookingId for a unique identifier
                        ...bookingDetails,
                    }));
                });




                const newarr = flattenedArray.
                    filter((ele) => {
                        if (ele?.createdAt) {
                            return ele
                        }
                    }
                    )

                newarr.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);

                    return dateB - dateA;
                })

                console.log("newArrays", newarr)


                let arr = newarr.filter(item => item.userId !== undefined).map((item, index) => {
                    console.log(item, "ndhgkjeky")
                    return {
                        sl: index + 1,
                        // ID: item?.id,
                        driverId: item?.driverId,
                        ID: item?.id.substring(item?.id.indexOf('-') + 1),
                        // Name: moment(item.bookingDate).format("MM/DD/YY"),
                        bookingTime: item.bookingDateTime,
                        Name: parseDateTime(item.bookingDateTime),
                        email: item?.starting,
                        imageurl: item?.image,
                        pnno: item?.ending,
                        Pickuptime: item?.time,
                        userId: item?.userId,

                        action: (
                            <div style={{ display: "flex", flexDirection: "coloum" }}>
                                <svg
                                    // onClick={() => onEdit(item)}
                                    style={{
                                        height: "20px",
                                        width: "20px",
                                        cursor: "pointer",
                                        marginRight: "20px",
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                </svg>
                                <svg
                                    // onClick={() => onDelete(item?._id)}
                                    style={{
                                        color: "red",
                                        height: "20px",
                                        cursor: "pointer",
                                        width: "20px",
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-trash3"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                            </div>
                        ),
                    };

                });

                setAllDatas(arr)
                setisupdate(false)
            } else {
                setisupdate(false)
                console.log("No data available");
            }
        }).catch((error) => {
            setisupdate(false)
            console.error(error);
        })
    }

    useEffect(() => {
        allUsers()
        fetchAllDrivers()
    }, [])


    const [toAssignDriver, setToAssignDriver] = useState("")




    //assign aDriver in booking
    const assignDriver = async (e, row, bookingID, bookingTime) => {
        e.preventDefault()
        // console.log(bookingTime)
        let isopen = await searchUsersByBookingTime(row.userId, toAssignDriver, bookingTime)
        // console.log(isopen, await searchUsersByBookingTime(row.userId, toAssignDriver, bookingTime))
        if (isopen) {
            // console.log("can be")
            // return;
            const user_id = row.userId;
            const updateData = {
                "driverId": toAssignDriver
            }

            if (toAssignDriver && row.sl == rowNo) {
                moveRecord(`UserBookings/Upcomming/${user_id}`, `DriverBookings/${toAssignDriver}/UpcomingBooking`, bookingID, updateData, allUsers)
            }
            else {
                toast.error("Select a driver first")
            }
        } else {
            alert("Driver  already book in that time")
            console.log("")
        }
        // moveRecord('sourceBranch', 'destinationBranch', 'recordIdToMove');
    }





    const columns = [
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    SL
                </div>
            ),
            selector: (row) => row.sl,
            wrap: true
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Booking Date
                </div>
            ),
            selector: (row) => row.Name.date,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Pickup Date Time
                </div>
            ),
            selector: (row) => row.Pickuptime,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Pickup Location
                </div>
            ),
            selector: (row) => row.email,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Dropoff Location
                </div>
            ),
            selector: (row) => row.pnno,
        },

        // {
        //     name: (
        //         <div
        //             style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        //         >
        //             Profile pic
        //         </div>
        //     ),
        //     selector: (row) => <img style={{ height: "80px", width: "80px" }}
        //         src={row.imageurl == "image" ? defaulturl : row.imageurl} />,
        // },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Driver(s)
                </div>
            ),
            selector: (row) => {
                return (<>
                    <select className="form-control"
                        onChange={(e) => {
                            setToAssignDriver(e.target.value)
                            setrowNo(row.sl)
                            console.log(e.target.value, "kkk")

                        }}
                    >

                        <option value="">Choose Driver</option>
                        {
                            arrDrivers?.map((item, index) => {
                                return (<>
                                    <option selected={row.driverId === item?.key} key={index} value={item?.key}>{item?.firstName}&nbsp;{item?.lastName}</option>
                                </>)
                            })
                        }
                    </select>

                </>)
            },
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Action
                </div>
            ),
            selector: (row) => {
                return (
                    row.driverId ? <button className="btn btn-sm btn-success"
                        style={{ minWidth: "80px" }}

                    >Assigned</button> : <button className="btn btn-sm btn-primary "
                        style={{ minWidth: "80px" }}
                        onClick={(e) => { console.log(row); assignDriver(e, row, row.ID, row.bookingTime) }}
                    >Assign</button>)
            },
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



    return (
        <>

            <div className="main_wrap">
                <div className="container-fluid">

                    <div style={{ display: "block", alignItems: "center", justifyContent: "center", height: "40px" }}>
                        Upcomming Bookings
                    </div>

                    <div component="div" className="TabsAnimation appear-done enter-done">
                        <div className="main-card mb-3 card">

                            <DataTable columns={columns} data={allDatas} pagination />
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

export default UserBookings;
