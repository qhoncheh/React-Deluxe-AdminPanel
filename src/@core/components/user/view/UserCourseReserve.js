// ** Reactstrap Imports
import { Badge, Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import Logo from "@src/assets/images/logo/reactdeluxe.png";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// const projectsArr = [
//   {
//     progress: 60,
//     hours: "210:30h",
//     progressColor: "info",
//     totalTasks: "233/240",
//     // subtitle: 'React Project',
//     title: "BGC",
//     img: reactLabel,
//   },
//   {
//     hours: "89h",
//     progress: 15,
//     totalTasks: "9/50",
//     progressColor: "danger",
//     // subtitle: 'UI/UX Project',
//     title: "Falcon",
//     img: xdLabel,
//   },
//   {
//     progress: 90,
//     hours: "129:45h",
//     totalTasks: "100/190",
//     progressColor: "success",
//     // subtitle: 'Vuejs Project',
//     title: "Dashboard",
//     img: vueLabel,
//   },
//   {
//     hours: "45h",
//     progress: 49,
//     totalTasks: "12/86",
//     progressColor: "warning",
//     // subtitle: 'iPhone Project',
//     title: "Foodista",
//     img: sketchLabel,
//   },

//   {
//     progress: 73,
//     hours: "67:10h",
//     totalTasks: "234/378",
//     progressColor: "info",
//     // subtitle: 'React Project',
//     title: "Doj",
//     img: reactLabel,
//   },
//   {
//     progress: 81,
//     hours: "108:39h",
//     totalTasks: "264/537",
//     title: "HTML",
//     progressColor: "success",
//     // subtitle: 'Crypto Website',
//     img: htmlLabel,
//   },
//   {
//     progress: 78,
//     hours: "88:19h",
//     totalTasks: "214/627",
//     progressColor: "success",
//     // subtitle: 'Vuejs',
//     // title: 'Vue Admin template',
//     img: vueLabel,
//   },
// ];

export const columns = [
  {
    sortable: true,
    minWidth: "130px",
    name: "نام دوره",
    selector: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            {/* <Avatar className='me-1' img={row.img} alt={row.courseName} imgWidth='32' /> */}
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.courseName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: " تاریخ رزرو دوره",
    selector: (row) => row.reserverDate.slice(0, 10),
  },
  {
    name: "وضعیت دوره ",
    selector: (row) => row.accept,
    sortable: true,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            {/* <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' /> */}
          </div>
          <div className="d-flex flex-column">
            <span
              className="text-truncate fw-bolder"
              style={{ width: "250px" }}
            >
              {row.accept ? (
                <Badge
                  color="light-success"
                  className="fs-5"
                  style={{ width: "35px", textAlign: "center" }}
                >
                  فعال
                </Badge>
              ) : (
                <Badge
                  color="light-danger"
                  className="fs-5"
                  style={{ width: "70px", textAlign: "center" }}
                >
                  غیر فعال
                </Badge>
              )}
            </span>
          </div>
        </div>
      );
    },
  },
  // {
  //   name: " عکس",
  //   selector: (row) => row.tumbImageAddress,
  //   cell: (row) => {
  //     return (
  //       <Avatar
  //         img={
  //           row.tumbImageAddress !== null && row.tumbImageAddress !== "Not-set"
  //             ? row.tumbImageAddress
  //             : Logo
  //         }
  //       />
  //     );
  //   },
  // },
];

const UserCourseReserve = (data) => {
  // const { id } = useParams();
  // getQuery("userCourses", `/User/UserDetails/${id}`);
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["userCourses"],
  // });

  // if (isLoading) return <div>Loading</div>;
  // if (isError) return <div>اطلاعات یافت نشد</div>;

  return (
    <Card>
      <div className="react-dataTable user-view-account-projects ">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data.data.coursesReseves}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserCourseReserve;
