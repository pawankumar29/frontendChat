import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../style/page.css';

function Pagination(props) {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);

const {Comp}=props;

  const userData = localStorage.getItem("userData");
  const dataa = JSON.parse(userData);
console.log("userDataIn==>",data);
  const id=dataa?.data.id;


  const getData = async () => {
    const res = await      
    axios.get(`http://localhost:5166/v1/getRecord/${id}`,{
       headers:{
      token:localStorage.getItem('token')
       }
    }) 

    const data = res.data.data;
    console.log("dataInPage===>",res.data);


    const pageNumber = offset * perPage;
    const slice = data.slice(pageNumber, pageNumber + perPage);

    // const postData = slice.map((pd) => (
    //   <div key={pd.id}>
    //     <p>{pd.title}</p>
    //     <img src={pd.thumbnailUrl} alt="" />
    //   </div>
    // ));

    console.log("slice===>",slice);
      Comp(slice);
    setPageCount(Math.ceil(data.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="App">
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Pagination;
