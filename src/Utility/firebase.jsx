import { asyncThunkCreator } from "@reduxjs/toolkit";
import {
  get,
  getDatabase,
  set,
  equalTo,
  ref as RTRef,
  child,
  remove,
  update,
  orderByChild,
  query,
} from "firebase/database";
import moment from "moment";
import toast from "react-hot-toast";

//taking data from one datatable and send that to another datatable
async function moveRecord(
  sourceBranch,
  destinationBranch,
  recordId,
  updateData,
  allUsers
) {
  try {
    const database = getDatabase();
    const dbRef = RTRef(getDatabase());

    const sourceRef = RTRef(database, `${sourceBranch}/${recordId}`);

    const destinationRef = RTRef(database, `${destinationBranch}/${recordId}`);

    const snapshot = await get(sourceRef);
    const data = snapshot.val();

    if (data) {
      await set(destinationRef, data);

      updateData1(sourceBranch, recordId, updateData);
      allUsers();
      toast.success("Driver Assign SuccsessFully");
      console.log("Record moved successfully!");
    } else {
      console.log("Record not found in the source branch.");
    }
  } catch (error) {
    console.error("Error moving record:", error);
  }
}

//updating one data in datatable
function updateData1(branch, recordId, newData) {
  try {
    const database = getDatabase();
    const recordRef = RTRef(database, `${branch}/${recordId}`);

    update(recordRef, newData);
    // alert("updated sucsessfully");
    console.log("Data updated successfully!");
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

//delete drivers
function deleteData(branch, recordId) {
  try {
    const database = getDatabase();
    const recordRef = RTRef(database, `${branch}/${recordId}`);

    // Use the remove method to delete the record
    remove(recordRef);

    console.log("Data deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}

const get_Time = (timeString) => {
  console.log(timeString, "lllluuuuu");
  if (timeString) {
    const match = timeString.match(/(\d+) hours (\d+) mins/);

    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      return hours + minutes / 60;
      // return { h: hours, m: minutes };
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

function addHoursToDateTime(dateTime, hoursToAdd) {
  // console.log(",,,,,,,,,", dateTime, hoursToAdd);
  const resultTime = moment(dateTime).add(hoursToAdd, "hours");
  const resultTimeString = resultTime.toISOString();
  return resultTimeString;
}

//firebase Search quary
// const findand_check=  (userId, driverId, bookingTime)=>{
//   const isonThatTime=true;

// }

const searchUsersByBookingTime = async (userId, driverId, bookingTime) => {
  let isPresent = false;

  // const upcomingBookingRef = RTRef(
  //   database,
  //   `DriverBookings/${driverId}/UpcomingBooking`
  // );
  // const usersQuery = query(upcomingBookingRef, equalTo("userId", targetAge));

  // try {
  //   const snapshot = await get(usersQuery);
  //   console.log(snapshot);
  //   const matchingBookings = [];
  //   snapshot.forEach((childSnapshot) => {
  //     const bookingData = childSnapshot.val();
  //     matchingBookings.push(bookingData);
  //   });

  //   console.log(matchingBookings);
  // } catch (error) {
  //   console.error("Error querying users by age:", error);
  //   throw error; // Rethrow the error for handling in the calling code
  // }
  const dbRef = RTRef(getDatabase());
  // console.log(userId, driverId, bookingTime, dbRef);

  return new Promise((resolve, reject) => {
    get(child(dbRef, `DriverBookings/${driverId}/UpcomingBooking`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          const resdata = Object.entries(snapshot.val());

          let filterdata = [];
          for (let i = 0; i < resdata.length; i++) {
            const ele = resdata[i];
            let time1 = bookingTime;
            let time2 = ele[1]?.bookingDateTime;
            let time3 = ele[1]?.time;
            // console.log(
            //   time1,
            //   time2,
            //   time3,
            //   "kkkk                                          "
            // );

            const restime = get_Time(time3);
            // const time4 = 3 + 17 / 60;

            const newtime = addHoursToDateTime(time2, restime);

            if (userId == ele[1].userId) {
              const date1 = moment(time1);
              const date2 = moment(time2);
              const date3 = moment(newtime);
              if (date2 <= date1 && date1 <= date3) {
                console.log("can't be book");
                isPresent = false;
                console.log(ele[1]);
                break;
                // return false;
              } else {
                console.log("Can Book");
                isPresent = true;
                // return true;
              }
            } else {
              console.log("No Data Found");
            }
          }
          // console.log(filterdata);
        }
        resolve(isPresent);
      }
    );
  });
};

export { moveRecord, deleteData, searchUsersByBookingTime };
