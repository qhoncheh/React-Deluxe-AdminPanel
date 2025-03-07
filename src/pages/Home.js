import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Col,
  Row,
} from "reactstrap";

import decorationLeft from "../assets/images/elements/decore-left.png";
import decorationRight from "../assets/images/elements/decore-right.png";
import { Award } from "react-feather";
import Avatar from "@components/avatar";
import StatsCard from "../@core/components/Dashboard/StatsCard";
import GoalOverview from "../@core/components/Dashboard/GoalOverview";
import { useContext } from "react";
import { ThemeColors } from "../utility/context/ThemeColors";
import CardBrowserState from "../@core/components/Dashboard/CardBrowserState";
import Earnings from "../@core/components/Dashboard/Earnings";
import CardTransactions from "../@core/components/Dashboard/CardTransactions";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["UserInfo"],
  });
  console.log(data);
  const { colors } = useContext(ThemeColors);
  return (
    <div>
      {/* <Card>
        <CardHeader>
          <CardTitle>
            <span className="fs-3 fw-5">سلام</span>
            <br />
            <span className="fs-3 fw-5">{data?.fName} </span>
            <span className="fs-3 fw-5">{data?.lName}</span>
            <br />
            <span className="fs-1 fw-5">خوش اومدی!👋</span>
          </CardTitle>
        </CardHeader> */}
      {/* <CardBody>
          <CardText>All the best for your new project.</CardText>
          <CardText>
            Please make sure to read our{" "}
            <CardLink
              href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/"
              target="_blank"
            >
              Template Documentation
            </CardLink>{" "}
            to understand where to go from here and how to use our template.
          </CardText>
        </CardBody> */}
      {/* </Card> */}
      <Row>
        <Col>
          <Card className="card-congratulations">
            <CardBody className="text-center">
              <img
                className="congratulations-img-left"
                src={decorationRight}
                alt="decor-left"
              />
              <img
                className="congratulations-img-right"
                src={decorationLeft}
                alt="decor-right"
              />
              <div className="d-flex justify-content-center gap-4">
                <Avatar
                  img={data?.currentPictureAddress}
                  className="shadow"
                  color="primary"
                  size="xl"
                />
                <div className="text-center">
                  <h1 className="mb-1 text-white">
                    {" "}
                    <span className="fw-5">{data?.fName} </span>
                    <span className="fw-5">{data?.lName}</span>
                  </h1>
                  <CardText className="m-auto w-75 fs-4">خوش آمدید🎉</CardText>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="match-height">
        <Col>
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <GoalOverview success={colors.success.main} />
        </Col>
      </Row>
      <Row>
      <Col lg="4" md="6" xs="12">
          <CardBrowserState success={colors.success.main} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <Earnings success={colors.success.main} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardTransactions success={colors.success.main} />
        </Col>
      </Row>

    </div>
  );
};

export default Home;
