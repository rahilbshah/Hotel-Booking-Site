/* eslint-disable array-callback-return */
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({columns}) => {
  const location=useLocation();
  const path=location.pathname.split("/")[1];
  const [list, setList] = useState([])
  const {data,data2}=useFetch(`/${path}`)
  useEffect(()=>{
    setList(data)
  },[data])
  
  
  const handleDelete = async (id) => {
    if(path==="rooms"){
      let hotelId;
      data2.map((input)=>{
        input.rooms.map((input2)=>{
          if(input2===id){
            hotelId=input._id;
          }
        })
      })
      try {
        await axios.delete(`/${path}/${id}/${hotelId}`)
        setList(list.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
      }
    }else{
      try {
        await axios.delete(`/${path}/${id}`)
        setList(list.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const listname=path.charAt(0).toUpperCase() + path.slice(1)

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id,params.row.hotelId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {listname}
        <Link to={`/${path}/new`} className="link">
          Add New {listname}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        experimentalFeatures={{newEditingApi: true}}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
