function CurrentClassTable({ items }) {
    return (
      <table className="classTable">
        <thead className="table-light">
          <tr>
            <th scope="col">Class Name</th>
            <th scope="col">Class Teacher</th>
            <th scope="col">Period</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.length > 0 &&
            items.map((item, i) => (
              <tr key={i} className={`${i % 2 === 0 ? "even" : "odd"}`}>
                <td>{item?.class_name}</td>
                <td>{item?.class_teacher}</td>
                <td>{item?.sch_period}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
  
  export default CurrentClassTable;
  