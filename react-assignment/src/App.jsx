
import './App.css';
import ReactPaginate from "react-paginate"
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [items,setitems]=useState([])
  const [search,setsearch]=useState("")
  const [perpage,setperpage] = useState(0)
  let limit=9;


  

  useEffect(()=>{
    let url= search && search.length>2 ?`https://jsonplaceholder.typicode.com/posts?q=${search}&_limit=${limit}`:
    `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}` 

    const landingitem=async()=>{
      await fetch(url)
      .then((res)=>{setperpage(res.headers.get("x-total-count"));return res.json()})
      .then((data)=>{console.log(data);setitems(data)})
      .catch((error)=>console.error(error))
    }
    landingitem()
  },[limit,search]);

  const paginateitems=async(currentpageno)=>{
    await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentpageno}&_limit=${limit}`)
      .then((res)=>res.json())
      .then((data)=>setitems(data))
      .catch((error)=>console.error(error))
  }

  const handelPageClick=(e)=>{
    paginateitems(e.selected+1)
  }

  const handleUserdesc = async(id)=>{
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res)=>res.json())
      .then((data)=>alert("Name:--"+data.name+"\n"+
      "Username:--"+data.username+"\n"+
      "Address:--"+data.address.city+"\n"+
      "Company:--"+data.company.name))
      .catch((error)=>console.error(error))

  }

  return (
    <div className="container" >
      <div className="inp">
        <input type="text" onChange={(e)=>setsearch(e.target.value)} placeholder='Search by Title'/>
      </div>

      <div className="row m-2"  >
      {items && items.map((item)=>(
        <div key={item.id} className="col-sm-6 col-md-4 v my-2" >
          <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.body}</p>
              <button onClick={()=>handleUserdesc(item.userId)} className="btn btn-primary">View User</button>
            </div>
          </div>
        </div>
      ))}</div>

      
      
      <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={Math.ceil(perpage/limit)}
      onPageChange={handelPageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
      />
    </div>
  );
}

export default App;
