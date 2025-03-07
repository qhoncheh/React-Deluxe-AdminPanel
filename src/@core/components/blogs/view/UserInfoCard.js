// ** React Imports
import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X, Eye, MessageSquare } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { getQuery } from "../../../../core/services/api/ReactQuery/getQuery";
import { useQuery } from "@tanstack/react-query";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useGetBlogDetails } from "../../../../core/services/api/GetBlogDetail";
import { DatePersianizer } from "./../../../../utility/utils/DatePersianizer";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: selectedUser.username,
      // lastName: selectedUser.fullName.split(' ')[1],
      // firstName: selectedUser.fullName.split(' ')[0]
    },
  });

  // ** render user img
  const renderUserImg = () => {
    // if (selectedUser !== null && selectedUser.avatar.length)
    {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          // src={selectedUser.avatar}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
      // } else {
      // return (
      //   <Avatar
      //     initials
      //     // color={selectedUser.avatarColor || 'light-primary'}
      //     className='rounded mt-3 mb-2'
      //     // content={selectedUser.fullName}
      //     contentStyles={{
      //       borderRadius: 0,
      //       fontSize: 'calc(48px)',
      //       width: '100%',
      //       height: '100%'
      //     }}
      //     style={{
      //       height: '110px',
      //       width: '110px'
      //     }}
      //   />
      // )
    }
  };
  // getQuery("newsdetail", `news/${id}`);
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["newsdetail"],
  // });

  // if (isLoading) return <div>Loading</div>;
  // if (isError) return <div>اطلاعات یافت نشد</div>;

  // const UserInfoCard = () => {
  //   const { id } = useParams();

  //   if (!id) {
  //     return <div>شناسه معتبر نیست</div>;
  //   }

  //   const { data, isError, isLoading } = useQuery({
  //     queryKey: ["newsdetail", id],
  //     queryFn: () => getQuery(`news/${id}`),
  //     onError: (error) => console.error('Error fetching data:', error),
  //   });

  //   if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>اطلاعات یافت نشد</div>;
  const { id } = useParams();

  const { data } = useGetBlogDetails(id);
  // const { detailsNewsDto } = data;
  // console.log(data);

  return (
    <div style={{ width: "25%" }}>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <Avatar
                img={data?.detailsNewsDto.currentImageAddress}
                imgHeight={150}
                imgWidth={150}
              />
              <div className="d-flex flex-column align-items-center text-center mt-2">
                <div className="user-info">
                  <h4 className=" fs-3 fw-bolder">
                    {data?.detailsNewsDto.title}
                  </h4>
                  {data?.detailsNewsDto.active ? (
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
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Eye className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.detailsNewsDto.currentView}</h4>
                <small>بازدیدها </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <MessageSquare className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.detailsNewsDto.commentsCount}</h4>
                <small>کامنت ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {/* {selectedUser !== null ? ( */}
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25">نام نویسنده:</span>
                <span>{data?.detailsNewsDto.addUserFullName}</span>
                {/* <span>{data.googleTitle}</span> */}
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">دسته بندی :</span>
                <span>{data?.detailsNewsDto.newsCatregoryName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">عنوان کوتاه:</span>
                {/* <Badge className='text-capitalize'  */}
                {/* color={statusColors[selectedUser.status]} */}
                {/* > */}
                {/* {selectedUser.status} */}
                {/* </Badge> */}
                <span>{data?.detailsNewsDto.miniDescribe}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">عنوان گوگل:</span>
                {/* <span className='text-capitalize'> */}
                <span>{data?.detailsNewsDto.googleTitle}</span>
                {/* </span> */}
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25"> تاریخ ایجاد:</span>
                <span>{DatePersianizer(data?.detailsNewsDto.insertDate)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ بروزرسانی:</span>
                <span>{DatePersianizer(data?.detailsNewsDto.updateDate)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">توضیحات دوره:</span>
                <span>{data?.detailsNewsDto.describe}</span>
              </li>
            </ul>
            {/* ) : null} */}
          </div>
          {/* <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline>
              Suspended
            </Button>
          </div>  */}
        </CardBody>
      </Card>
      {/* <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='username'>
                  Username
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='username'
                  name='username'
                  render={({ field }) => (
                    <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  Billing Email
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={selectedUser.email}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Status:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.status)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  Tax ID
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  Contact
                </Label>
                <Input id='contact' defaultValue={selectedUser.contact} placeholder='+1 609 933 4422' />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='language'>
                  language
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className='form-check-label fw-bolder' for='billing-switch'>
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal> */}
    </div>
  );
};

export default UserInfoCard;
