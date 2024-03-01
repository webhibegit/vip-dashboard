



import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";
import { getDownloadURL, getStorage, ref, uploadBytes, } from "firebase/storage";
import { firebaseApp } from "../Athentication/firebase/fbConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { get, getDatabase, set, ref as RTRef, child } from "firebase/database";
// import { getDatabase, ref, child, get } from "firebase/database";
import { RotatingSquare, Watch } from "react-loader-spinner";
import "./Driver.css"
import { deleteData } from "../Utility/firebase";

import Swal from 'sweetalert2'
import { useNavigate, useNavigation } from "react-router-dom";


const Driver = () => {
    const defaulturl = "https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"

    const initial = {
        firstName: "",
        lastName: "",
        phno: "",
        email: "",
        password: ""

    }
    const [inputDatas, setinputData] = useState(initial);
    const [image, setImage] = useState();
    const [isupdate, setisupdate] = useState(false);
    const [isimgupload, setisimgupload] = useState(false);
    const [allDatas, setAllDatas] = useState([]);

    console.log(allDatas, "jlklkl")




    const navigate = useNavigate()
    const [allLanguage, setAllLanguage] = useState([]);

    const [hide, setHide] = useState(true);
    // const [id, setId] = useState("");



    const handleChange = (e) => {

        setinputData(({
            ...inputDatas, [e.target.name]: e.target.value
        }))



    }

    //image upload
    const ImageUpload = (e) => {
        setisimgupload(true)
        let file = e.target.files[0];
        const filename = file.name

        const storage = getStorage(firebaseApp);
        // const mountainsRef = ref(storage, 'mountains.jpg');
        // const mountainImagesRef = ref(storage, 'profileImage/mountains.jpg');
        const mountainImagesRef = ref(storage, filename);

        console.log(mountainImagesRef)
        // alert(mountainImagesRef)
        // While the file names are the same, the references point to different files
        // mountainsRef.name === mountainImagesRef.name;           // true
        // mountainsRef.fullPath === mountainImagesRef.fullPath;   // false
        //............................................................................after Creating Ref...........
        const storageRef = ref(storage, 'some-child');

        // 'file' comes from the Blob or File API
        uploadBytes(mountainImagesRef, file).then((snapshot) => {

            console.log(snapshot)
            getDownloadURL(mountainImagesRef).then((url) => {
                setImage(url)
                setisimgupload(false)
                console.log(url)
            }
            )
        });



    }

    const DeleteItem = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {

                const isdelete = deleteData("drivers/", id)
                if (isdelete) {
                    allUsers()
                }

                Swal.fire(
                    'Deleted!',


                )
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    // 'Your imaginary file is safe :)',
                    // 'error'
                )
            }
        })






    }

    //creating Driver as a user
    function signUpWithEmailAndPassword() {


        if (inputDatas.email && inputDatas.firstName && inputDatas.lastName) {
            setisupdate(true)
            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, inputDatas.email, inputDatas.password)
                .then((userCredential) => {
                    // Signed up 

                    // console.log("rrr", userCredential)
                    const userId = userCredential.user.uid;
                    writeUserData(userId,)


                })
                .catch((error) => {
                    setisupdate(false)
                    toast.error("Credential not match ")
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });;

        } else {
            alert("enterAll data")
        }
    }


    //sending Driver data in realTime Database
    function writeUserData(userId) {

        const db = getDatabase();

        // console.log("kjhgk", inputDatas.email, inputDatas.firstName, inputDatas.lastName)
        if (inputDatas.email && inputDatas.firstName && inputDatas.lastName) {


            console.log(inputDatas.phno)
            set(RTRef(db, 'drivers/' + userId), {
                // username: inputDatas.name,
                email: inputDatas.email,
                image: image,
                phno: inputDatas.phno,
                firstName: inputDatas.firstName,
                lastName: inputDatas.lastName
            })
                .then((res) => {
                    setisupdate(false)
                    setinputData(initial)
                    setImage("")
                    allUsers()
                    toast.success("Driver created successfully!");
                })
                .catch((error) => {
                    setisupdate(false)
                    console.error("Error writing user data:", error);
                });

        } else {
            toast.error("All fields are required ")
        }
    }


    //fetchingAllUsers
    const allUsers = () => {

        setisupdate(true)
        const dbRef = RTRef(getDatabase());
        get(child(dbRef, `drivers`)).then((snapshot) => {
            if (snapshot.exists()) {
                const alldata = Object.entries(snapshot.val());



                let arr = alldata?.map((item, index) => {
                    console.log("kkllw", item)
                    return {
                        sl: index + 1,
                        Name: item[1]?.firstName + item[1]?.firstName,
                        email: item[1]?.email,
                        imageurl: item[1]?.image,
                        phno: item[1]?.phno,
                        showBookings: <button style={{
                            minWidth: "150px", backgroundColor: "blue", color: "white",
                            padding: "4px 12px",
                            fontSize: "14px",
                            borderRadius: "2%"
                        }} onClick={() => { navigate(`/DriverBookings/${item[0]}`) }}>Show Bookings</button>,

                        action: (
                            <div style={{ display: "flex", flexDirection: "coloum" }}>
                                {/* <svg
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
                                </svg> */}
                                <svg
                                    onClick={() => DeleteItem(item[0])}
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
                // console.log(Object.values(snapshot.val()))
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
    }, [])





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
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Driver Name
                </div>
            ),
            selector: (row) => row.Name,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Email
                </div>
            ),
            selector: (row) => row.email,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Profile pic
                </div>
            ),
            selector: (row) => <img style={{ height: "80px", width: "80px" }}
                src={row.imageurl == "image" ? defaulturl : row.imageurl} />,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Ph no
                </div>
            ),
            selector: (row) => row.phno,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Show Bookings
                </div>
            ),
            selector: (row) => row.showBookings

            ,
        },
        {
            name: (
                <div
                    style={{
                        fontSize: "14px",
                        color: "#495057",
                        marginLeft: "15px",
                        fontWeight: "bolder",
                    }}
                >
                    Action
                </div>
            ),
            selector: (row) => row.action,
        },
    ];



    return (
        <>

            <div className="main_wrap">
                <div className="container-fluid">



                    <div component="div" className="TabsAnimation appear-done enter-done">
                        <div className="main-card mb-3 card">
                            <div className="card-body">
                                {hide ? (
                                    <div
                                        style={{
                                            textAlign: "center",
                                            fontSize: "20px",
                                            color: "#868e96",
                                            margin: "35px",
                                        }}
                                        className="card-title"
                                    >
                                        Add Driver
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            textAlign: "center",
                                            fontSize: "20px",
                                            color: "#868e96",
                                            margin: "35px",
                                        }}
                                        className="card-title"
                                    >
                                        Edit Driver
                                    </div>
                                )}

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label for="exampleInputEmail1">
                                            Frist Name<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={inputDatas.firstName}
                                            onChange={(e) => { handleChange(e) }}
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label for="exampleInputEmail1">
                                            Last Name<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={inputDatas.lastName}
                                            onChange={(e) => { handleChange(e) }}
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label for="exampleInputEmail1">
                                            ph No<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="number"
                                            name="phno"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={inputDatas.phno}
                                            onChange={(e) => { handleChange(e) }}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label for="exampleInputEmail1">
                                            Email<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={inputDatas.email}
                                            onChange={(e) => { handleChange(e) }}
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label for="exampleInputEmail1">
                                            Password<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={inputDatas.password}
                                            onChange={(e) => { handleChange(e) }}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label for="exampleInputEmail1">
                                            Image<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="file"
                                            name="password"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"

                                            onChange={(e) => { ImageUpload(e); }}
                                        />

                                        {isimgupload ? <RotatingSquare
                                            visible={true}
                                            height="100"
                                            width="100"
                                            color="#4fa94d"
                                            ariaLabel="rotating-square-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        /> :
                                            <img style={{ height: "100px", width: "100px" }}
                                                src={image ?? defaulturl} />
                                        }

                                    </div>
                                </div>


                                {hide ? (
                                    <button className="btn btn-primary" onClick={() => {
                                        signUpWithEmailAndPassword()



                                    }}>
                                        Submit
                                    </button>
                                ) : (
                                    <button className="btn btn-primary" >
                                        Update
                                    </button>
                                )}

                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "20px",
                                        color: "#868e96",
                                        margin: "35px",
                                    }}
                                    className="card-title"
                                >
                                    Manage Drivers
                                </div>
                                <DataTable columns={columns} data={allDatas} pagination />
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

export default Driver;
