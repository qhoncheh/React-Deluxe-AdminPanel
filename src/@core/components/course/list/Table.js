// ** React Imports
import { Fragment, useState, useEffect } from "react";

import Avatar from "@components/avatar";

import Pic from "@src/assets/images/avatars/1.png";
import Pic2 from "@src/assets/images/raty/star-on-2.png";
import Logo from "@src/assets/images/logo/reactdeluxe.png";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  MoreVertical,
  Trash2,
  Archive,
  Send,
  Eye,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";

// ** Table Header
// const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
//   // ** Converts table to CSV
//   function convertArrayOfObjectsToCSV(array) {
//     let result

//     const columnDelimiter = ','
//     const lineDelimiter = '\n'
//     const keys = Object.keys(store.data[0])

//     result = ''
//     result += keys.join(columnDelimiter)
//     result += lineDelimiter

//     array.forEach(item => {
//       let ctr = 0
//       keys.forEach(key => {
//         if (ctr > 0) result += columnDelimiter

//         result += item[key]

//         ctr++
//       })
//       result += lineDelimiter
//     })

//     return result
//   }

//   // ** Downloads CSV
//   function downloadCSV(array) {
//     const link = document.createElement('a')
//     let csv = convertArrayOfObjectsToCSV(array)
//     if (csv === null) return

//     const filename = 'export.csv'

//     if (!csv.match(/^data:text\/csv/i)) {
//       csv = `data:text/csv;charset=utf-8,${csv}`
//     }

//     link.setAttribute('href', encodeURI(csv))
//     link.setAttribute('download', filename)
//     link.click()
//   }
//   return (
//     <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
//       <Row>
//         <Col xl='6' className='d-flex align-items-center p-0'>
//           <div className='d-flex align-items-center w-100'>
//             <label htmlFor='rows-per-page'>Show</label>
//             <Input
//               className='mx-50'
//               type='select'
//               id='rows-per-page'
//               value={rowsPerPage}
//               onChange={handlePerPage}
//               style={{ width: '5rem' }}
//             >
//               <option value='10'>10</option>
//               <option value='25'>25</option>
//               <option value='50'>50</option>
//             </Input>
//             <label htmlFor='rows-per-page'>Entries</label>
//           </div>
//         </Col>
//         <Col
//           xl='6'
//           className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
//         >
//           <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
//             <label className='mb-0' htmlFor='search-invoice'>
//               Search:
//             </label>
//             <Input
//               id='search-invoice'
//               className='ms-50 w-100'
//               type='text'
//               value={searchTerm}
//               onChange={e => handleFilter(e.target.value)}
//             />
//           </div>

//           <div className='d-flex align-items-center table-header-actions'>
//             <UncontrolledDropdown className='me-1'>
//               <DropdownToggle color='secondary' caret outline>
//                 <Share className='font-small-4 me-50' />
//                 <span className='align-middle'>Export</span>
//               </DropdownToggle>
//               <DropdownMenu>
//                 <DropdownItem className='w-100'>
//                   <Printer className='font-small-4 me-50' />
//                   <span className='align-middle'>Print</span>
//                 </DropdownItem>
//                 <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
//                   <FileText className='font-small-4 me-50' />
//                   <span className='align-middle'>CSV</span>
//                 </DropdownItem>
//                 <DropdownItem className='w-100'>
//                   <Grid className='font-small-4 me-50' />
//                   <span className='align-middle'>Excel</span>
//                 </DropdownItem>
//                 <DropdownItem className='w-100'>
//                   <File className='font-small-4 me-50' />
//                   <span className='align-middle'>PDF</span>
//                 </DropdownItem>
//                 <DropdownItem className='w-100'>
//                   <Copy className='font-small-4 me-50' />
//                   <span className='align-middle'>Copy</span>
//                 </DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>

//             <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
//               Add New User
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   )
// }

import { useCourseList } from "../../../../core/services/api/courseList";
import { FullPageLoading } from "../../../../assets/Loadings/FullPageLoading/FullPageLoading";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDeleteCourse } from "../../../../core/services/api/DeleteCourse";
import { usehandleDelete } from "./CourseHandleDelete/handleDelete";
const UsersList = () => {
 
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب کنید ...",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "انتخاب کنید ...",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب کنید ...",
    number: 0,
  });

  const { data, isLoading, isError } = useCourseList(
    currentPage,
    rowsPerPage,
    searchTerm
  );

  if (isError) return <div>Error while fetching¯\_(ツ)_/¯</div>;

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** User filter options
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "author", label: "Author" },
    { value: "editor", label: "Editor" },
    { value: "maintainer", label: "Maintainer" },
    { value: "subscriber", label: "Subscriber" },
  ];

  const planOptions = [
    { value: "", label: "انتخاب کنید..." },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected > 0 ? page.selected + 1 : 1);
    console.log("Page Selected:", page.selected > 0 ? page.selected + 1 : 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
    console.log("Per Page: ", value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
   
    setSearchTerm(val);
    console.log("Search Value: ", val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data?.totalCount / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        forcePage={currentPage > 0 ? currentPage - 1 : 0} // Adjust for zero-based indexing
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-center my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  // const MySwal = withReactContent(Swal);

  // const mutation = useDeleteCourse();

  const handleDelete = usehandleDelete();

  const column = [
    {
      name: "نام دوره",
      
      minWidth: "300px",
      sortField: "title",
      // selector: (data) => data?.fullName,
      cell: (data) => (
        <div className="d-flex gap-1 justify-content-left align-items-center">
          <Avatar img={data.tumbImageAddress ?? Logo} />
          {/* {renderClient(row)} */}
          <div className="d-flex flex-column">
            <Link
              className="user_name text-truncate text-body p-0"
              to={`/courseDetail/${data?.courseId}`}
            >
              <span className="fw-bolder">{data?.title}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">
              {data?.fullName}
            </small>
          </div>
        </div>
      ),
    },
    {
      name: "نوع دوره",
    center:true,
      minWidth: "172px",
      sortField: "typeName",
      selector: (row) => row.typeName,
      // cell: row => renderRole(row)
    },
    {
      name: "سطح",
      minWidth: "172px",
      sortField: "levelName",
      selector: (row) => row.levelName,
      // cell: row => renderRole(row)
    },
    {
      name: "وضعیت",
      minWidth: "172px",
      sortField: "statusName",
      selector: (row) => row.statusName,
      // cell: row => renderRole(row)
    },
    {
      name: "تعداد رزرو",
      maxWidth: "110px",
      sortField: "reserveCount",
      selector: (row) => row.reserveCount,
      // cell: row => renderRole(row)
    },
    {
      name: "فعالیت",
      sortable: true,
      maxWidth: "100px",
      sortField: "isActive ",
      selector: (row) => (
        <div>
          {" "}
          {row.isActive ? (
            <Badge
              color="light-success"
              className="fs-5"
              style={{ width: "60px", textAlign: "center" }}
            >
              تایید شده
            </Badge>
          ) : (
            <Badge
              color="light-danger"
              className="fs-5"
              style={{ width: "60px", textAlign: "center" }}
            >
              {" "}
              تایید نشده{" "}
            </Badge>
          )}
        </div>
      ),
      //<div> {row.isActive ? "فعال" : "غیر فعال"}</div>,
      // cell: row => renderRole(row)
    },
    {
      name: "اقدامات",
      minWidth: "100px",
    center:true,
      cell: (row) => (
        <div className="column-action d-flex">
          <Link
            className="user_name text-truncate text-body p-0"
            to={`/courseDetail/${row?.courseId}`}
          >
            <div className="btn btn-sm">
              <FileText
                className="cursor-pointer"
                size={17}
                id={`send-tooltip-${row.id}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`send-tooltip-${row.id}`}
                // className="mb-1"
              >
                جزییات دوره
              </UncontrolledTooltip>
            </div>
          </Link>
          <div className="btn btn-sm" onClick={() => handleDelete(row)}>
            <Trash2 size={17} className="" id={`pw-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              حذف دوره
            </UncontrolledTooltip>
          </div>
          {/* <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/apps/user/view/${row.id}`}
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={e => e.preventDefault()}
              >
                <Archive size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                // onClick={e => {
                //   e.preventDefault()
                //   store.dispatch(deleteUser(row.id))
                // }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">مرتب سازی</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      currentPlan: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">نوع مرتب سازی</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <Row className="ltr py-1 px-2">
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <label htmlFor="rows-per-page" style={{ marginRight: "25px" }}>
                نمایش
              </label>
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{ width: "5rem" }}
              >
                <option value="10">۱۰</option>
                <option value="15">۱۵</option>
                <option value="25">۲۵</option>
                <option value="50">۵۰</option>
                <option value="75">۷۵</option>
                <option value="100">۱۰۰</option>
              </Input>
              {/* <label htmlFor="rows-per-page">Entries</label> */}
            </div>
          </Col>
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1 ">
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                type="text"
                value={searchTerm}
                onChange={(e) => handleFilter(e.target.value)}
              />
            </div>

            <div className="d-flex align-items-center table-header-actions">
              <UncontrolledDropdown className="me-1">
                <DropdownMenu>
                  <DropdownItem className="w-100">
                    <Printer className="font-small-4 me-50" />
                    <span className="align-middle">Print</span>
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() => downloadCSV(store.data)}
                  >
                    <FileText className="font-small-4 me-50" />
                    <span className="align-middle">CSV</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <Grid className="font-small-4 me-50" />
                    <span className="align-middle">Excel</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <File className="font-small-4 me-50" />
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <Copy className="font-small-4 me-50" />
                    <span className="align-middle">Copy</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Button
                className="add-new-user"
                color="primary"
                onClick={toggleSidebar}
              >
                جستجو
              </Button>
            </div>
          </Col>
        </Row>
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={column}
            // onSort={handleSort}
            // sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={data?.courseDtos}
            // subHeaderComponent={
            //   <CustomHeader
            //     store={store}
            //     searchTerm={searchTerm}
            //     rowsPerPage={rowsPerPage}
            //     handleFilter={handleFilter}
            //     handlePerPage={handlePerPage}
            //     toggleSidebar={toggleSidebar}
            //   />
            // }
          />
        </div>
      </Card>

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export default UsersList;
