const Table=({searchData})=>{

  return(
    <div className="table-box">
      <table>
      <thead>
        <tr>
        <th>Image</th>
        <th>title</th>
        <th>description</th>
        <th>updated</th>
        </tr>
      </thead>
      <tbody>
      {searchData.map((d,i)=>{
        return (
         <tr key={i}>
            <td>
              <img src="/logo192.png" alt={d.image}/>
            </td>
            <td>{d.name}</td>
            <td>{d.description}</td>
            <td>{`${new Date(d.dateLastEdited).toLocaleString()}`}</td>
          </tr>
        )
      })}
    </tbody>
    </table>
    </div>
  )
}

export default Table;