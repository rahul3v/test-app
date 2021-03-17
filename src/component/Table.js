const Table=({searchData})=>{

  return(
    <div className="table-box">
      <table>
      <thead>
        <tr className="mhide">
        <th>Image</th>
        <th>title</th>
        <th>description</th>
        <th>updated</th>
        </tr>
        <tr className="tmobile">
        <th>Feeds</th>
        <th></th>
        </tr>
      </thead>
      <tbody>
      {searchData.map((d,i)=>{
        return (
         <tr key={i}>
            <td>
              <img src="/logo192.png" alt={d.image}/>
            </td>
            <td className="mhide">
              {d.name}</td>
            <td>
              <h2 className="mobile">{d.name}</h2>
              {d.description}<br/>
              <p class="time">{`${new Date(d.dateLastEdited).toLocaleString()}`}</p>
              </td>
            <td className="mhide">{`${new Date(d.dateLastEdited).toLocaleString()}`}</td>
          </tr>
        )
      })}
    </tbody>
    </table>
    </div>
  )
}

export default Table;