import * as React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import styles from "./NonBillingReviewsForm.module.scss";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import * as moment from "moment";
import {
  Checkbox,
  DatePicker,
  DefaultButton,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  ITextFieldStyles,
  IconButton,
  Label,
  PrimaryButton,
  Stack,
  TextField,
  Persona,
  PersonaSize,
} from "@fluentui/react";
import { log } from "@pnp/pnpjs";
import TechnicalSkill from "./TechnicalSkill";
import { locales } from "moment";
import { get } from "@microsoft/sp-lodash-subset";

interface IForm {
  Status: string;
  staffName: number;
  StaffEmail: string;
  StaffTitle: string;
  title: string;
  sbu: string;
  reviewer1: number;
  reviewer1Email: string;
  reviewer1Level: string;
  reviewer2: number;
  reviewer2Email: string;
  reviewer1Title: string;
  reviewer2Level: string;
  reviewer2Title: string;
  isValid: boolean;
  SDstaffComments: string;
  TLstaffComments: string;
  TSstaffComments: string;
  OverallstaffComments: string;
  GoalsstaffComments: string;
  isSubmit1: boolean;
  isSubmit2: boolean;
  isSubmit3: boolean;

  isSubmitDisabled: boolean;

  isEdit: boolean;
  TechnicalSkillName: string;
  TechnicalSkillRating: string;
  masterSelectedTechnicalName: ITechnicalName[];
  modifiedSelectedTechnicalName: ITechnicalName[];
  C101PRR: string;
  C101ARR: string;
  C102PRR: string;
  C102ARR: string;

  C103PRR: string;
  C103ARR: string;

  C104PRR: string;
  C104ARR: string;

  C105PRR: string;
  C105ARR: string;

  C106PRR: string;
  C106ARR: string;

  C207PRR: string;
  C207ARR: string;

  C208PRR: string;
  C208ARR: string;

  C209PRR: string;
  C209ARR: string;

  C210PRR: string;
  C210ARR: string;

  C211PRR: string;
  C211ARR: string;

  C1PRComments: string;
  C1ARComments: string;

  C2PRComments: string;
  C2ARComments: string;
  TechnicalSkillPRComments: string;
  TechnicalSkillARComments: string;
  AdditionalPRComments: string;
  AdditionalARComments: string;
  OverallPRComments: string;
  OverallARComments: string;
  GoalsPRComments: string;
  GoalsARComments: string;
  C1ARTotal: number;
  C1PRTotal: number;
  C2PRTotal: number;
  C2ARTotal: number;
  GoalsARDate: any;
  GoalsPRDate: any;
  OverallTSRating: string;
  TSRating1: string;
  OverallPRRating: number;
  OverallARRating: number;
  CalculatedTsRating: number;
  OverallTsRating2: string;
  CalculatedOverallTs2: number;
  GoalsHistory: string;
  AwardOverallRating: string;
  Submitted: number;
  ReverComments: string;
  AwaitingAknowledgeComments: string;
}

interface ITechnicalName {
  TechinicalSkillName: string;
  TechnicalSkillRating: string;
  TSRating1: string;
}
interface IChoice {
  key: string;
  text: string;
  disabled: boolean;
}
let TSOptions: IChoice[] = [];

const MainComponent = (props) => {
  let revData: IForm = {
    Status: "",
    staffName: null,
    StaffEmail: "",
    StaffTitle: "",
    title: "",
    sbu: "",
    reviewer1: null,
    reviewer1Email: "",
    reviewer1Level: "",
    reviewer2: null,
    reviewer2Email: "",
    reviewer1Title: "",
    reviewer2Title: "",
    reviewer2Level: "",
    isValid: false,
    SDstaffComments: "",
    TLstaffComments: "",
    TSstaffComments: "",
    OverallstaffComments: "",
    GoalsstaffComments: "",
    isSubmit1: false,
    isSubmit2: false,
    isSubmit3: false,

    isSubmitDisabled: false,

    isEdit: false,
    TechnicalSkillName: "",
    TechnicalSkillRating: "",
    TSRating1: "",
    masterSelectedTechnicalName: [],
    modifiedSelectedTechnicalName: [],
    C101PRR: "",
    C101ARR: "",

    C102PRR: "",
    C102ARR: "",
    C103PRR: "",
    C103ARR: "",
    C104PRR: "",
    C104ARR: "",
    C105PRR: "",
    C105ARR: "",
    C106PRR: "",
    C106ARR: "",
    C207PRR: "",
    C207ARR: "",
    C208PRR: "",
    C208ARR: "",
    C209PRR: "",
    C209ARR: "",
    C210PRR: "",
    C210ARR: "",
    C211PRR: "",
    C211ARR: "",
    C2PRComments: "",
    C2ARComments: "",
    C1PRComments: "",
    C1ARComments: "",
    OverallARRating: 0,
    OverallPRRating: 0,
    CalculatedTsRating: 0,
    CalculatedOverallTs2: 0,

    TechnicalSkillPRComments: "",
    TechnicalSkillARComments: "",
    AdditionalPRComments: "",
    AdditionalARComments: "",
    OverallPRComments: "",
    OverallARComments: "",
    GoalsPRComments: "",
    GoalsARComments: "",
    C1ARTotal: null,
    C1PRTotal: null,
    C2PRTotal: null,
    C2ARTotal: null,
    GoalsPRDate: "",
    GoalsARDate: "",
    OverallTSRating: "",
    OverallTsRating2: "",
    GoalsHistory: "",
    AwardOverallRating: "",
    Submitted: null,
    ReverComments: "",
    AwaitingAknowledgeComments: "",
  };
  const [currentUser, setCurrentUser] = useState({
    id: null,
    email: "",
    Title: "",
  });
  const [ddData, setddData] = useState([]);

  const [reviewFormData, setReviewFormData] = useState<IForm>(revData);
  const [isReviewIDAvail, setIsReviewIDAvail] = useState(false);
  const [currentuserId, setCurrentUserId] = useState(0);

  const jobTitleOptions: IDropdownOption[] = [
    { key: "Managing Director", text: "Managing Director" },
    { key: "Senior Director", text: "Senior Director" },
    { key: "Director", text: "Director" },
    { key: "Senior Manager", text: "Senior Manager" },
    { key: "Manager", text: "Manager" },
    { key: "Senior Associate", text: "Senior Associate" },
    { key: "Associate", text: "Associate" },
    { key: "Analyst", text: "Analyst" },
    { key: "Other", text: "Other" },
  ];

  const Ratingoptions: IDropdownOption[] = [
    { key: "NA", text: "NA" },
    { key: "5", text: "5" },
    { key: "4.5", text: "4.5" },
    { key: "4", text: "4" },
    { key: "3.5", text: "3.5" },
    { key: "3", text: "3" },
    { key: "2.5", text: "2.5" },
    { key: "2", text: "2" },
    { key: "1.5", text: "1.5" },
    { key: "1", text: "1" },
  ];
  const TechnicalSkilloption: IDropdownOption[] = [
    { key: "Java", text: "Java" },
    { key: "Reactjs", text: "Reactjs" },
    { key: "javascript", text: "javascript" },
    { key: "Nextjs", text: "Nextjs" },
  ];

  const sbuOptions: IDropdownOption[] = [
    { key: "570-Houston", text: "570-Houston" },
    { key: "571/57J-FTS", text: "571/57J-FTS" },
    { key: "572-Chicago", text: "572-Chicago" },
    { key: "573-NewYork", text: "573-NewYork" },
    {
      key: "574-RealEstate&EnvironmentalEconomics",
      text: "574-RealEstate&EnvironmentalEconomics",
    },
    { key: "575-NationalPractice", text: "575-NationalPractice" },
    { key: "577-Washington,DC", text: "577-Washington,DC" },
    { key: "578-Phoenix", text: "578-Phoenix" },
    { key: "579-Dallas", text: "579-Dallas" },
    { key: "57A-Boston", text: "57A-Boston" },
    { key: "57B-DC Investigations", text: "57B-DC Investigations" },
    { key: "57C-Denver", text: "57C-Denver" },
    { key: "57D-SanFrancisco", text: "57D-SanFrancisco" },
    { key: "57E-Detroit", text: "57E-Detroit" },
    { key: "57F-FinancialCrimes", text: "57F-FinancialCrimes" },
    { key: "57K-Cyber", text: "57K-Cyber" },
    { key: "470-Calgary", text: "470-Calgary" },
    { key: "other", text: "other" },
  ];
  const boxTextField: Partial<ITextFieldStyles> = {
    root: {
      textarea: {
        height: 225,
        resize: "none",
      },
    },
    fieldGroup: {
      border: "1px solid #000 !important",
      "::after": {
        border: "none !important",
        // border: "1px solid #000",
      },
    },
  };
  const boxTextField1 = {
    root: {
      textarea: {
        width: "100%",

        height: 80,
        resize: "none",
      },
    },
  };
  const boxTextField2 = {
    root: {
      textarea: {
        height: 80,
        resize: "none",
      },
    },
  };
  const dropDownStyles: Partial<IDropdownStyles> = {
    root: {
      width: "100%",
      display: "flex",
    },
    dropdown: {
      width: "30%",
    },
  };
  const TechnicalskillText = {
    root: {
      width: "100%",
    },
  };
  const Datepickerstyle = {
    root: {
      width: 200,
    },
  };

  // getonchange values
  const onChange = (key: string, value: any): void => {
    let _reviewFormData: IForm = { ...reviewFormData };

    _reviewFormData[key] = value;

    _reviewFormData.isValid =
      _reviewFormData.staffName != null &&
      _reviewFormData.title != "" &&
      _reviewFormData.sbu != "" &&
      _reviewFormData.reviewer1 != null &&
      _reviewFormData.reviewer1Level != "" &&
      _reviewFormData.reviewer2 != null &&
      _reviewFormData.reviewer2Level != "";

    // if (reviewFormData.Status == "Awaiting Reviewee") {
    //   _reviewFormData.isSubmitDisabled =
    //     _reviewFormData.SDstaffComments == "" ||
    //     _reviewFormData.GoalsstaffComments == "" ||
    //     _reviewFormData.OverallstaffComments == "" ||
    //     _reviewFormData.TLstaffComments == "" ||
    //     _reviewFormData.TSstaffComments == "";
    // }

    // if (reviewFormData.Status == "Preliminary/Additional Reviewer") {
    //   _reviewFormData.isSubmitDisabled =
    //     _reviewFormData.C1PRComments == "" ||
    //     _reviewFormData.C2PRComments == "" ||
    //     _reviewFormData.TechnicalSkillPRComments == "" ||
    //     _reviewFormData.AdditionalPRComments == "" ||
    //     _reviewFormData.GoalsPRComments == "";
    // }

    // if (reviewFormData.Status == "Final Reviewer") {
    //   _reviewFormData.isSubmitDisabled =
    //     _reviewFormData.C1ARComments == "" ||
    //     _reviewFormData.C2ARComments == "" ||
    //     _reviewFormData.TechnicalSkillARComments == "" ||
    //     _reviewFormData.AdditionalARComments == "" ||
    //     _reviewFormData.GoalsARComments == "";
    // }

    _reviewFormData.isSubmitDisabled =
      submitButtonDisableHandler(_reviewFormData);

    _reviewFormData.C1PRTotal = C1PRTotals([
      _reviewFormData.C101PRR,
      _reviewFormData.C102PRR,
      _reviewFormData.C103PRR,
      _reviewFormData.C104PRR,
      _reviewFormData.C105PRR,
      _reviewFormData.C106PRR,
    ]);

    _reviewFormData.C2PRTotal = C1PRTotals([
      _reviewFormData.C207PRR,
      _reviewFormData.C208PRR,
      _reviewFormData.C209PRR,
      _reviewFormData.C210PRR,
      _reviewFormData.C211PRR,
    ]);

    _reviewFormData.C1ARTotal = C1PRTotals([
      _reviewFormData.C101ARR,
      _reviewFormData.C102ARR,
      _reviewFormData.C103ARR,
      _reviewFormData.C104ARR,
      _reviewFormData.C105ARR,

      _reviewFormData.C106ARR,
    ]);

    _reviewFormData.C2ARTotal = C1PRTotals([
      _reviewFormData.C207ARR,
      _reviewFormData.C208ARR,
      _reviewFormData.C209ARR,
      _reviewFormData.C210ARR,
      _reviewFormData.C211ARR,
    ]);

    _reviewFormData.OverallPRRating = C1PRTotals([
      _reviewFormData.C1PRTotal,
      _reviewFormData.C2PRTotal,
      _reviewFormData.CalculatedTsRating,
    ]);
    _reviewFormData.OverallARRating = C1PRTotals([
      _reviewFormData.C1ARTotal,
      _reviewFormData.C2ARTotal,
      _reviewFormData.CalculatedOverallTs2,
    ]);
    setReviewFormData({ ..._reviewFormData });
  };

  // get TechnicalSkillSEction onchange

  const onChangeTechnicalName = (key, index, value, objKey) => {
    let _reviewFormData: IForm = { ...reviewFormData };
    _reviewFormData[key][index][objKey] = value;

    setReviewFormData({ ..._reviewFormData });
    AddTechnicalTotal(reviewFormData.modifiedSelectedTechnicalName);
  };

  // Rating Calculations

  const C1PRTotals = (value) => {
    let result: number | null;
    let total: number = 0;
    let count: number = 0;

    // let ratings: string[] = [];
    // ratings.push(value.C101PRR);
    // ratings.push(value.C102PRR);
    // ratings.push(value.C103PRR);
    // ratings.push(value.C104PRR);
    // ratings.push(value.C105PRR);
    // ratings.push(value.C106PRR);

    value.map((rating, index) => {
      if (rating != "" && rating !== "NA") {
        total += parseFloat(rating);
        count++;
      }
    });
    if (count != 0) {
      result = parseFloat((total / count).toFixed(2));
    } else {
      result = null;
    }
    return result;
  };

  // technicalskill  total
  const AddTechnicalTotal = (value) => {
    let result: number | null;
    let result1: number | null;
    let total: number = 0;
    let total1: number = 0;
    let count: number = 0;
    let count1: number = 0;

    // let ratings: string[] = [];
    // ratings.push(value.C101PRR);
    // ratings.push(value.C102PRR);
    // ratings.push(value.C103PRR);
    // ratings.push(value.C104PRR);
    // ratings.push(value.C105PRR);
    // ratings.push(value.C106PRR);

    value.map((rating, index) => {
      if (rating["TechnicalSkillRating"]) {
        if (
          rating["TechnicalSkillRating"] != "" &&
          rating["TechnicalSkillRating"] != "NA"
        ) {
          total += parseFloat(rating["TechnicalSkillRating"]);
          count++;
        }
      }
      if (rating["TSRating1"]) {
        if (rating["TSRating1"] != "" && rating["TSRating1"] != "NA") {
          total1 += parseFloat(rating["TSRating1"]);
          count1++;
        }
      }
    });
    if (count != 0) {
      result = parseFloat((total / count).toFixed(2));
    } else {
      result = null;
    }
    if (count != 0) {
      result1 = parseFloat((total1 / count1).toFixed(2));
    } else {
      result1 = null;
    }
    console.log(result, result1);
    reviewFormData.CalculatedTsRating = result;
    reviewFormData.CalculatedOverallTs2 = result1;
    setReviewFormData({ ...reviewFormData });

    return [result, result1];
  };

  // reviewFormData.CalculatedTsRating = total;
  // setReviewFormData({ ...reviewFormData });
  //get options from list
  const TechnicalskillOptions = (arr) => {
    TSOptions = [];
    props.sp.web.lists
      .getByTitle("DI Categories")
      .items.get()
      .then((i) => {
        i.forEach((x) => {
          if (x.Category == "NonBillable - Technical Skills") {
            TSOptions.push({
              key: x.Title,
              text: x.Title,
              disabled: false,
            });
          }
        });
        // console.log(TSOptions);

        TSOptions.sort((a: any, b: any) => a.text.localeCompare(b.text));

        if (Array.isArray(arr.masterSelectedTechnicalName)) {
          let tempTSOptions = TSOptions;
          tempTSOptions.forEach((option, index) => {
            const isOptionSelected = arr.masterSelectedTechnicalName.some(
              (opt) => opt["TechinicalSkillName"] === option.key
            );
            TSOptions[index].disabled = isOptionSelected;
          });
          setddData([...TSOptions]);
        } else {
          setddData([...TSOptions]);
        }
      })
      .catch((err) => console.log(err));
  };

  // optionhide fro Dropdown

  const DropdownHide = () => {
    // if (Array.isArray(reviewFormData.masterSelectedTechnicalName) && reviewFormData.masterSelectedTechnicalName.some(condition)) {

    // }

    if (Array.isArray(reviewFormData.masterSelectedTechnicalName)) {
      ddData.forEach((option) => {
        const isOptionSelected =
          reviewFormData.masterSelectedTechnicalName.some(
            (opt) => opt["TechinicalSkillName"] === option.key
          );
        option.disabled = isOptionSelected;
      });
      setddData([...ddData]);
    }
  };

  // get current user for peoplepickler

  const getCurrentUser = () => {
    const CurrentUser = props.context.pageContext.user.email;
    props.sp.web
      .currentUser()
      .then((e) => {
        let data = reviewFormData;
        if (e) {
          console.log(e);

          data.staffName = e.Id;
          setCurrentUser({ id: e.Id, email: e.Email, Title: e.Title });
          setReviewFormData({ ...data });
        }
        //get currentid user detail

        // console.log("ID:", currentuserId);
      })
      .then(() => {
        if (geturl()) {
          {
            props.sp.web.lists
              .getByTitle("Non Billable Reviews")
              .items.getById(geturl())
              .select(
                "*,Reviewer1Name/EMail,Reviewer1Name/Title,Reviewer2Name/EMail,Reviewer2Name/Title,Staff_x0020_Name/EMail,Staff_x0020_Name/Title"
              )
              .expand("Reviewer1Name,Reviewer2Name,Staff_x0020_Name")
              .get()
              .then((item) => {
                // console.log(item);

                let statusReviewer: IForm = { ...reviewFormData };
                statusReviewer.Status = item.Status ? item.Status : null;
                statusReviewer.StaffEmail = geturl()
                  ? item.Staff_x0020_Name.EMail
                  : currentUser.email;
                statusReviewer.StaffTitle = geturl()
                  ? item.Staff_x0020_Name.Title
                  : currentUser.Title;

                statusReviewer.staffName = item.Staff_x0020_NameId
                  ? item.Staff_x0020_NameId
                  : null;
                statusReviewer.sbu = item.SBU ? item.SBU : "";
                statusReviewer.title = item.Staff_x0020_Job_x0020_Title
                  ? item.Staff_x0020_Job_x0020_Title
                  : "";
                statusReviewer.reviewer1 = item.Reviewer1NameId
                  ? item.Reviewer1NameId
                  : null;
                statusReviewer.reviewer2Title = item.Reviewer2Name
                  ? item.Reviewer2Name.Title
                  : "";
                statusReviewer.reviewer1Title = item.Reviewer1Name
                  ? item.Reviewer1Name.Title
                  : "";
                statusReviewer.reviewer1Email = item.Reviewer1NameId
                  ? item.Reviewer1Name.EMail
                  : "";
                statusReviewer.reviewer1Level = item.Reviewer1Level
                  ? item.Reviewer1Level
                  : "";
                statusReviewer.reviewer2 = item.Reviewer2NameId
                  ? item.Reviewer2NameId
                  : null;
                statusReviewer.reviewer2Email = item.Reviewer2NameId
                  ? item.Reviewer2Name.EMail
                  : "";
                statusReviewer.reviewer2Level = item.Reviewer2Level
                  ? item.Reviewer2Level
                  : "";
                statusReviewer.SDstaffComments = item.SCStaffComments
                  ? item.SCStaffComments
                  : "";
                statusReviewer.TLstaffComments = item.TLStaffComments
                  ? item.TLStaffComments
                  : "";
                statusReviewer.TSstaffComments =
                  item.Technical_x0020_Skills_x0020_Sta
                    ? item.Technical_x0020_Skills_x0020_Sta
                    : "";
                statusReviewer.C1PRComments = item.C1PRComments
                  ? item.C1PRComments
                  : "";
                statusReviewer.C2PRComments = item.C2PRComments
                  ? item.C2PRComments
                  : "";
                statusReviewer.TechnicalSkillPRComments =
                  item.TechnicalSkillPRComments
                    ? item.TechnicalSkillPRComments
                    : "";
                statusReviewer.OverallstaffComments =
                  item.Overall_x0020_Skills_x0020_Staff
                    ? item.Overall_x0020_Skills_x0020_Staff
                    : "";
                statusReviewer.OverallPRComments = item.OverallPRComments
                  ? item.OverallPRComments
                  : "";
                statusReviewer.GoalsstaffComments =
                  item.Goals_x0020_Staff_x0020_Comment
                    ? item.Goals_x0020_Staff_x0020_Comment
                    : "";
                statusReviewer.GoalsPRComments = item.GoalsPRComments
                  ? item.GoalsPRComments
                  : "";
                statusReviewer.AdditionalPRComments = item.AdditionalPRComments
                  ? item.AdditionalPRComments
                  : "";
                statusReviewer.masterSelectedTechnicalName =
                  item.Technical_x0020_Skills
                    ? JSON.parse(item.Technical_x0020_Skills)
                    : "";
                statusReviewer.C1ARComments = item.C1ARComments;
                statusReviewer.C2ARComments = item.C2ARComments;
                statusReviewer.TechnicalSkillARComments =
                  item.TechnicalSkillARComments
                    ? item.TechnicalSkillARComments
                    : "";
                statusReviewer.AdditionalARComments = item.AdditionalARComments
                  ? item.AdditionalARComments
                  : "";
                statusReviewer.GoalsARComments = item.GoalsARComments
                  ? item.GoalsARComments
                  : "";
                statusReviewer.C101PRR = item.C101PRR ? item.C101PRR : "";
                statusReviewer.C101ARR = item.C101ARR ? item.C101ARR : "";
                statusReviewer.C102PRR = item.C102PRR ? item.C102PRR : "";
                statusReviewer.C102ARR = item.C102ARR ? item.C102ARR : "";
                statusReviewer.C103PRR = item.C103PRR ? item.C103PRR : "";
                statusReviewer.C103ARR = item.C103ARR ? item.C103ARR : "";
                statusReviewer.C104PRR = item.C104PRR ? item.C104PRR : "";
                statusReviewer.C104ARR = item.C104ARR ? item.C104ARR : "";
                statusReviewer.C105PRR = item.C105PRR ? item.C105PRR : "";
                statusReviewer.C105ARR = item.C105ARR ? item.C105ARR : "";
                statusReviewer.C106PRR = item.C106PRR ? item.C106PRR : "";
                statusReviewer.C106ARR = item.C106ARR ? item.C106ARR : "";
                statusReviewer.C207PRR = item.C207PRR ? item.C207PRR : "";
                statusReviewer.C207ARR = item.C207ARR ? item.C207ARR : "";
                statusReviewer.C208PRR = item.C208PRR ? item.C208PRR : "";
                statusReviewer.C208ARR = item.C208ARR ? item.C208ARR : "";
                statusReviewer.C209PRR = item.C209PRR ? item.C209PRR : "";
                statusReviewer.C209ARR = item.C209ARR ? item.C209ARR : "";
                statusReviewer.C210PRR = item.C210PRR ? item.C210PRR : "";
                statusReviewer.C210ARR = item.C210ARR ? item.C210ARR : "";
                statusReviewer.C211PRR = item.C211PRR ? item.C211PRR : "";
                statusReviewer.C211ARR = item.C211ARR ? item.C211ARR : "";
                statusReviewer.C1PRTotal = item.C1PRTotal ? item.C1PRTotal : 0;
                statusReviewer.C1ARTotal = item.C1ARTotal ? item.C1ARTotal : 0;
                statusReviewer.C2PRTotal = item.C2PRTotal ? item.C2PRTotal : 0;
                statusReviewer.C2ARTotal = item.C2ARTotal ? item.C2ARTotal : 0;
                statusReviewer.OverallPRRating = item.OverallPRRating
                  ? item.OverallPRRating
                  : 0;
                statusReviewer.OverallARRating = item.OverallARRating
                  ? item.OverallARRating
                  : 0;
                statusReviewer.GoalsARDate = item.GoalsARDate
                  ? new Date(item.GoalsARDate).toISOString()
                  : null;
                statusReviewer.GoalsPRDate = item.GoalsPRDate
                  ? new Date(item.GoalsPRDate).toISOString()
                  : null;
                statusReviewer.OverallTSRating =
                  item.Overall_x0020_Technical_x0020_Sk
                    ? item.Overall_x0020_Technical_x0020_Sk
                    : "";
                statusReviewer.TSRating1 = item.TSRating1 ? item.TSRating1 : "";
                statusReviewer.CalculatedTsRating =
                  item.Calculated_x0020_Technical_x0020
                    ? item.Calculated_x0020_Technical_x0020
                    : 0;
                statusReviewer.OverallTsRating2 = item.OverallTsRating2
                  ? item.OverallTsRating2
                  : "";
                statusReviewer.CalculatedOverallTs2 = item.CalculatedOverallTs2
                  ? item.CalculatedOverallTs2
                  : 0;
                statusReviewer.isSubmitDisabled =
                  submitButtonDisableHandler(statusReviewer);
                statusReviewer.GoalsHistory = item.Acknowledgement_x0020_History
                  ? item.Acknowledgement_x0020_History
                  : "";
                statusReviewer.AwardOverallRating = item.AwardOverallRating
                  ? item.AwardOverallRating
                  : "";
                statusReviewer.ReverComments =
                  item.Revert_x0020_Review_x0020_Commen
                    ? item.Revert_x0020_Review_x0020_Commen
                    : "";
                statusReviewer.AwaitingAknowledgeComments =
                  item.AwaitingAknowledgeComments
                    ? item.AwaitingAknowledgeComments
                    : "";
                console.log(statusReviewer, "statusReviewer");

                setReviewFormData({ ...statusReviewer });
                TechnicalskillOptions(statusReviewer);
              });
            // console.log(reviewFormData);
          }
        }
      })
      .catch((e) => console.log(e));
  };
  // start feview onclick
  const onStartReview = () => {
    props.sp.web.lists
      .getByTitle("Non Billable Reviews")
      .items.add({
        Status: "Awaiting Reviewee",
        Title: currentUser.Title,
        Submitted: 99,
        Staff_x0020_NameId: currentUser.id,
        Staff_x0020_Job_x0020_Title: reviewFormData.title,
        SBU: reviewFormData.sbu,
        Reviewer1NameId: reviewFormData.reviewer1,
        Reviewer2NameId: reviewFormData.reviewer2,
        Reviewer1Level: reviewFormData.reviewer1Level,
        Reviewer2Level: reviewFormData.reviewer2Level,
      })
      .then((i) => {
        window.location.href = getSharepointurl();
        console.log(i);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TSOptions.forEach(option => {
  //   if (reviewFormData.masterSelectedTechnicalName.some(opt => opt.key === option.key)) {
  //     option.disabled = true;
  //   } else {
  //     option.disabled = false;
  //   }
  // });

  // onsubmit when user click submit button
  const OnSubmitFunction = async (action: string) => {
    debugger;
    if (action == "Submit") {
      if (reviewFormData.Status == "Awaiting Reviewee") {
        reviewFormData.Status = "Awaiting Preliminary/Additional Reviewer";
        reviewFormData.Submitted = 2;
        setReviewFormData({ ...reviewFormData });
      } else if (
        reviewFormData.Status == "Awaiting Preliminary/Additional Reviewer"
      ) {
        reviewFormData.Status = "Awaiting Final Reviewer";
        reviewFormData.Submitted = 4;
        setReviewFormData({ ...reviewFormData });
      } else if (reviewFormData.Status == "Awaiting Final Reviewer") {
        reviewFormData.Status = "Awaiting Acknowledgement";
        reviewFormData.Submitted = 6;
        setReviewFormData({ ...reviewFormData });
      }
    } else if (action == "Revert") {
      if (reviewFormData.Status == "Awaiting Acknowledgement") {
        reviewFormData.Status = "Awaiting Final Reviewer";
        setReviewFormData({ ...reviewFormData });
      } else if (reviewFormData.Status == "Awaiting Final Reviewer") {
        reviewFormData.Status = "Awaiting Preliminary/Additional Reviewer";
        reviewFormData.Submitted = 5;
        setReviewFormData({ ...reviewFormData });
      } else if (
        reviewFormData.Status == "Awaiting Preliminary/Additional Reviewer"
      ) {
        reviewFormData.Status = "Awaiting Reviewee";
        reviewFormData.Submitted = 3;
        setReviewFormData({ ...reviewFormData });
      }
    } else if (action == "Acknowledged") {
      if (reviewFormData.Status == "Awaiting Acknowledgement") {
        reviewFormData.Status = "Acknowledged";
        reviewFormData.Submitted = 7;
        setReviewFormData({ ...reviewFormData });
      }
    }
    await props.sp.web.lists
      .getByTitle("Non Billable Reviews")
      .items.getById(geturl())
      .update({
        Submitted: reviewFormData.Submitted ? reviewFormData.Submitted : null,
        Status: reviewFormData.Status,
        SCStaffComments: reviewFormData.SDstaffComments,
        TLStaffComments: reviewFormData.TLstaffComments,
        Goals_x0020_Staff_x0020_Comment: reviewFormData.GoalsstaffComments,
        Technical_x0020_Skills_x0020_Sta: reviewFormData.TSstaffComments,
        Overall_x0020_Skills_x0020_Staff: reviewFormData.OverallstaffComments,
        Technical_x0020_Skills: JSON.stringify(
          reviewFormData.masterSelectedTechnicalName
        ),
        C1PRComments: reviewFormData.C1PRComments,

        C2PRComments: reviewFormData.C2PRComments,
        TechnicalSkillPRComments: reviewFormData.TechnicalSkillPRComments,
        AdditionalPRComments: reviewFormData.AdditionalPRComments,
        GoalsPRComments: reviewFormData.GoalsPRComments,
        C1ARComments: reviewFormData.C1ARComments,
        C2ARComments: reviewFormData.C2ARComments,
        TechnicalSkillARComments: reviewFormData.TechnicalSkillARComments,

        AdditionalARComments: reviewFormData.AdditionalARComments,
        GoalsARComments: reviewFormData.GoalsARComments,
        GoalsPRDate: reviewFormData.GoalsPRDate
          ? new Date(reviewFormData.GoalsPRDate).toISOString()
          : null,
        GoalsARDate: reviewFormData.GoalsARDate
          ? new Date(reviewFormData.GoalsARDate).toISOString()
          : null,

        C101PRR: reviewFormData.C101PRR,
        C101ARR: reviewFormData.C101ARR,
        C102PRR: reviewFormData.C102PRR,
        C102ARR: reviewFormData.C102ARR,
        C103PRR: reviewFormData.C103PRR,
        C103ARR: reviewFormData.C103ARR,
        C104PRR: reviewFormData.C104PRR,
        C104ARR: reviewFormData.C104ARR,
        C105PRR: reviewFormData.C105PRR,
        C105ARR: reviewFormData.C105ARR,
        C106PRR: reviewFormData.C106PRR,
        C106ARR: reviewFormData.C106ARR,
        C207PRR: reviewFormData.C207PRR,
        C207ARR: reviewFormData.C207ARR,
        C208PRR: reviewFormData.C208PRR,
        C208ARR: reviewFormData.C208ARR,
        C209PRR: reviewFormData.C209PRR,
        C209ARR: reviewFormData.C209ARR,
        C210PRR: reviewFormData.C210PRR,
        C210ARR: reviewFormData.C210ARR,
        C211PRR: reviewFormData.C211PRR,
        C211ARR: reviewFormData.C211ARR,
        C1PRTotal: reviewFormData.C1PRTotal ? reviewFormData.C1PRTotal : 0,
        C1ARTotal: reviewFormData.C1ARTotal ? reviewFormData.C1ARTotal : 0,
        C2PRTotal: reviewFormData.C2PRTotal ? reviewFormData.C2PRTotal : 0,
        C2ARTotal: reviewFormData.C2ARTotal ? reviewFormData.C2ARTotal : 0,
        OverallARRating: reviewFormData.OverallARRating
          ? reviewFormData.OverallARRating
          : 0,
        OverallPRRating: reviewFormData.OverallPRRating
          ? reviewFormData.OverallPRRating
          : 0,
        Overall_x0020_Technical_x0020_Sk: reviewFormData.OverallTSRating,
        OverallTsRating2: reviewFormData.OverallTsRating2,
        Calculated_x0020_Technical_x0020: reviewFormData.CalculatedTsRating,
        CalculatedOverallTs2: reviewFormData.CalculatedOverallTs2,
        Acknowledgement_x0020_History: reviewFormData.GoalsHistory,
        AwardOverallRating: reviewFormData.AwardOverallRating,
        Revert_x0020_Review_x0020_Commen: reviewFormData.ReverComments,
        AwaitingAknowledgeComments: reviewFormData.AwaitingAknowledgeComments
          ? reviewFormData.AwaitingAknowledgeComments
          : "",
      })
      .then((i) => {
        window.location.href = getSharepointurl();
        console.log(i);
        // i.array.forEach((element) => {
        //   console.log(element);
        //   if (element.Status == "Awaiting Reviewee") {
        //     element.Status = "Awaiting PrimaryReviewer";
        //   }
        // });
        // console.log(i);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const sum = () => {
  //   let total = 0;

  //   reviewFormData.masterSelectedTechnicalName.forEach((x) => {
  //     let value = parseFloat(x.TechnicalSkillRating);
  //     if (!isNaN(value)) {
  //       total += value;
  //     }
  //   });

  //   let total1 = 0;
  //   reviewFormData.masterSelectedTechnicalName.forEach((x) => {
  //     let value = parseFloat(x.TSRating1);
  //     if (!isNaN(value)) {
  //       total1 += value;
  //     }
  //   });

  //   reviewFormData.CalculatedTsRating = total;
  //   reviewFormData.CalculatedOverallTs2 = total1;
  //   setReviewFormData({ ...reviewFormData });
  // };
  //  let total = 0;

  // reviewFormData.masterSelectedTechnicalName.forEach((x) => {
  //   let value = parseFloat(x.TechnicalSkillRating);
  //   if (!isNaN(value)) {
  //     total += value;
  // /   }
  // });

  // let total1 = 0;
  // reviewFormData.masterSelectedTechnicalName.forEach((x) => {
  //   let value = parseFloat(x.TSRating1);
  //   if (!isNaN(value)) {
  //     total1 += value;
  //   }
  // });

  // reviewFormData.CalculatedTsRating = total;
  // reviewFormData.CalculatedOverallTs2 = total1;
  // setReviewFormData({ ...reviewFormData });

  // getid from url

  const geturl = () => {
    const url = new URL(window.location.href);

    const searchParams = new URLSearchParams(url.search);

    const Id = searchParams.get("ReviewItem");

    setCurrentUserId(parseInt(Id));

    if (Id) {
      setIsReviewIDAvail(true);
    } else {
      setIsReviewIDAvail(false);
    }
    // console.log(reviewFormData);
    return Id ? parseInt(Id) : null;
  };
  const getSharepointurl = () => {
    const listName = "NonBillableReviews";

    const listUrl = `${props.context.pageContext.web.absoluteUrl}/Lists/${listName}`;
    console.log(listUrl, "listurl");

    return listUrl;
  };

  //AddTechnical Skill
  const addTechnicalSkill = () => {
    // reviewFormData.SelectedTechnicalName = [];
    if (!Array.isArray(reviewFormData.masterSelectedTechnicalName)) {
      reviewFormData.masterSelectedTechnicalName = [];
    }
    reviewFormData.masterSelectedTechnicalName.push({
      TechinicalSkillName: reviewFormData.TechnicalSkillName,
      TechnicalSkillRating: reviewFormData.TechnicalSkillRating,
      TSRating1: reviewFormData.TSRating1,
    });
    reviewFormData.modifiedSelectedTechnicalName.push({
      TechinicalSkillName: reviewFormData.TechnicalSkillName,
      TechnicalSkillRating: reviewFormData.TechnicalSkillRating,
      TSRating1: reviewFormData.TSRating1,
    });

    AddTechnicalTotal(reviewFormData.masterSelectedTechnicalName);
    DropdownHide();
    reviewFormData.TechnicalSkillName = "";
    // reviewFormData.TechnicalSkillRating = null;
    // reviewFormData.TSRating1 = null;

    setReviewFormData({ ...reviewFormData });

    console.log(reviewFormData.masterSelectedTechnicalName);
  };
  //delete technical skill
  const deleteTechnicallSkillName = (index) => {
    console.log(index);

    const updatedData = { ...reviewFormData };
    updatedData.masterSelectedTechnicalName.splice(index, 1);
    setReviewFormData({ ...updatedData }); // Update the s
    DropdownHide();
    AddTechnicalTotal(reviewFormData.masterSelectedTechnicalName);
  };

  const submitButtonDisableHandler = (_reviewFormData): boolean => {
    if (_reviewFormData.Status == "Awaiting Reviewee") {
      return (
        _reviewFormData.SDstaffComments == "" ||
        _reviewFormData.GoalsstaffComments == "" ||
        _reviewFormData.OverallstaffComments == "" ||
        _reviewFormData.TLstaffComments == "" ||
        _reviewFormData.TSstaffComments == ""
      );
    }

    if (_reviewFormData.Status == "Awaiting Preliminary/Additional Reviewer") {
      return (
        _reviewFormData.C1PRComments == "" ||
        _reviewFormData.C2PRComments == "" ||
        _reviewFormData.TechnicalSkillPRComments == "" ||
        _reviewFormData.AdditionalPRComments == "" ||
        _reviewFormData.GoalsPRComments == "" ||
        _reviewFormData.C101PRR == "" ||
        _reviewFormData.C102PRR == "" ||
        _reviewFormData.C103PRR == "" ||
        _reviewFormData.C104PRR == "" ||
        _reviewFormData.C105PRR == "" ||
        _reviewFormData.C106PRR == "" ||
        _reviewFormData.C207PRR == "" ||
        _reviewFormData.C208PRR == "" ||
        _reviewFormData.C209PRR == "" ||
        _reviewFormData.C210PRR == "" ||
        _reviewFormData.C211PRR == ""
      );
    }

    if (_reviewFormData.Status == "Awaiting Final Reviewer") {
      return (
        _reviewFormData.C1ARComments == "" ||
        _reviewFormData.C2ARComments == "" ||
        _reviewFormData.TechnicalSkillARComments == "" ||
        _reviewFormData.AdditionalARComments == "" ||
        _reviewFormData.GoalsARComments == "" ||
        _reviewFormData.GoalsARDate == null ||
        _reviewFormData.C101ARR == "" ||
        _reviewFormData.C102ARR == "" ||
        _reviewFormData.C103ARR == "" ||
        _reviewFormData.C104ARR == "" ||
        _reviewFormData.C105ARR == "" ||
        _reviewFormData.C106ARR == "" ||
        _reviewFormData.C207ARR == "" ||
        _reviewFormData.C208ARR == "" ||
        _reviewFormData.C209ARR == "" ||
        _reviewFormData.C210ARR == "" ||
        _reviewFormData.C211ARR == ""
      );
    }
  };
  // const init = () => {
  //   getCurrentUser();
  // };
  React.useEffect(() => {
    getCurrentUser();
    // init();
    // DropdownHide();
    // TechnicalskillOptions();
  }, []);

  return (
    <>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.colHeader100}>
            <span className={styles.subTitle}>
              Disputes and Investigations - Annual Review Form
            </span>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.row}>
            <div className={styles.col25Right}>
              <Label>Staff Name:</Label>
            </div>
            <div className={styles.col25left}>
              {
                // if status = empty || Review Item ID = ""

                reviewFormData.Status == "" ? (
                  <PeoplePicker
                    context={props.context}
                    personSelectionLimit={1}
                    groupName={""}
                    showtooltip={true}
                    // required={true}
                    disabled={true}
                    ensureUser={true}
                    showHiddenInUI={false}
                    defaultSelectedUsers={
                      [
                        reviewFormData.Status == ""
                          ? currentUser.email
                          : reviewFormData.StaffEmail,
                      ]
                      // geturl() != null
                      //   ? [reviewFormData.StaffEmail]
                      //   : [currentUser.email]
                    }
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                    // selectedItems={(e: any) => {
                    //   onChange("staffName", e.length > 0 ? e[0].id : null);
                    // }}
                  />
                ) : (
                  <Persona
                    size={PersonaSize.size32}
                    text={
                      reviewFormData.Status != ""
                        ? reviewFormData.StaffTitle
                        : currentUser.Title
                    }
                    imageUrl={
                      reviewFormData.Status != ""
                        ? "/_layouts/15/userphoto.aspx?size=S&username=" +
                          reviewFormData.StaffEmail
                        : "/_layouts/15/userphoto.aspx?size=S&username=" +
                          currentUser.email
                    }
                  />
                )
              }
            </div>
            <div className={styles.col25Right}>
              <Label> Job Title:</Label>
            </div>
            <div className={styles.col25left}>
              {/* <Dropdown
                placeholder="Select Job Title"
                options={jobTitleOptions}
                selectedKey={reviewFormData.title}
                disabled={isReviewIDAvail}
                onChange={(e, choice) => {
                  onChange("title", choice.key);
                }}
              /> */}
              <TextField
                value={reviewFormData.title}
                onChange={(e, val) => {
                  onChange("title", val);
                }}
                disabled={reviewFormData.Status != "" ? true : false}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col25Right}>
              <Label>SBU:</Label>
            </div>
            <div className={styles.col25left}>
              <Dropdown
                options={sbuOptions}
                placeholder="Select SBU"
                selectedKey={reviewFormData.sbu}
                disabled={isReviewIDAvail}
                onChange={(e, choice) => {
                  onChange("sbu", choice.key);
                }}
              />
            </div>
            {/* <div className={styles.col25Right}>
            <Label>Time at Level (Years, Months):</Label>
          </div>
          <div className={styles.col25left}>
            <TextField></TextField>
          </div> */}
          </div>
          {/* <div className={styles.row}>
          <div className={styles.col25Right}>
            <Label>YTD Utilization (%):</Label>
          </div>
          <div className={styles.col25left}>
            <TextField></TextField>
          </div>
          <div className={styles.col25Right}>
            <Label>Days Out of Town:</Label>
          </div>
          <div className={styles.col25left}>
            <TextField></TextField>
          </div>
          </div> */}

          <div className={styles.row}>
            <div className={styles.col25Right}>
              <Label> Preliminary/Additional Reviewer:</Label>
            </div>
            <div className={styles.col25left}>
              {
                // if status = empty || Review Item ID = ""

                reviewFormData.Status == "" ? (
                  <PeoplePicker
                    context={props.context}
                    personSelectionLimit={1}
                    groupName={""} // Leave this blank in case you want to filter from all users
                    showtooltip={true}
                    // required={true}
                    ensureUser={true}
                    // showHiddenInUI={false}
                    showHiddenInUI={true}
                    disabled={isReviewIDAvail}
                    principalTypes={[PrincipalType.User]}
                    defaultSelectedUsers={[reviewFormData.reviewer1Email]}
                    resolveDelay={1000}
                    selectedItems={(e: any) => {
                      onChange("reviewer1", e.length > 0 ? e[0].id : null);
                      // onChange("reviewer1Title", e.length > 0 ? e[0].text : "");
                    }}
                  />
                ) : (
                  <Persona
                    size={PersonaSize.size32}
                    text={reviewFormData.reviewer1Title}
                    imageUrl={
                      "/_layouts/15/userphoto.aspx?size=S&username=" +
                      reviewFormData.reviewer1Email
                    }
                  />
                )
              }
            </div>
            <div className={styles.col25Right}>
              <Label>Preliminary/Additional Reviewer Job Title:</Label>
            </div>
            <div className={styles.col25left}>
              {/* <Dropdown
                placeholder="Select Job Title"
                options={jobTitleOptions}
                selectedKey={reviewFormData.reviewer1Level}
                disabled={isReviewIDAvail}
                onChange={(e, choice) => {
                  onChange("reviewer1Level", choice.key);
                }}
              /> */}

              <TextField
                value={reviewFormData.reviewer1Level}
                onChange={(e, val) => {
                  onChange("reviewer1Level", val);
                }}
                disabled={reviewFormData.Status != "" ? true : false}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col25Right}>
              <Label>Final Reviewer:</Label>
            </div>
            <div className={styles.col25left}>
              {reviewFormData.Status == "" ? (
                <PeoplePicker
                  context={props.context}
                  personSelectionLimit={1}
                  groupName={""} // Leave this blank in case you want to filter from all users
                  showtooltip={true}
                  // required={true}
                  ensureUser={true}
                  showHiddenInUI={false}
                  disabled={isReviewIDAvail}
                  principalTypes={[PrincipalType.User]}
                  // defaultSelectedUsers={[
                  //   this.state.ReviewDetails.BasicDetails.Reviewer.Email,
                  // ]}
                  defaultSelectedUsers={[reviewFormData.reviewer2Email]}
                  selectedItems={(e: any) => {
                    onChange("reviewer2", e.length > 0 ? e[0].id : null);
                  }}
                  resolveDelay={1000}
                />
              ) : (
                <Persona
                  size={PersonaSize.size32}
                  text={reviewFormData.reviewer2Title}
                  imageUrl={
                    "/_layouts/15/userphoto.aspx?size=S&username=" +
                    reviewFormData.reviewer2Email
                  }
                />
              )}
            </div>
            <div className={styles.col25Right}>
              <Label>Final Reviewer Job Title:</Label>
            </div>
            <div className={styles.col25left}>
              {/* <Dropdown
                placeholder="Select Job Title"
                options={jobTitleOptions}
                selectedKey={reviewFormData.reviewer2Level}
                disabled={isReviewIDAvail}
                onChange={(e, choice) => {
                  onChange("reviewer2Level", choice.key);
                }}
              /> */}
              <TextField
                value={reviewFormData.reviewer2Level}
                onChange={(e, val) => {
                  onChange("reviewer2Level", val);
                }}
                disabled={reviewFormData.Status != "" ? true : false}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col25Right} hidden={true}>
              <Label>Is Staff Comments Mandatory?</Label>
            </div>
            <div className={styles.col25left} hidden={true}>
              <Checkbox />
            </div>
          </div>

          {/* button section */}
          {!isReviewIDAvail && (
            <div className={styles.row}>
              <div className={styles.col100}>
                <div className={styles.row}>
                  <div className={styles.col100right}>
                    <PrimaryButton
                      text="Start Review"
                      onClick={() => onStartReview()}
                      disabled={!reviewFormData.isValid}
                    ></PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isReviewIDAvail && (
            <div className={styles.row}>
              <div className={styles.col100right}>
                <Label className={styles.reviewStatus}>
                  Review Status : {reviewFormData.Status}
                </Label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* section 2   Performing Rating Scale*/}

      {isReviewIDAvail && (
        <>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>Performing Rating Scale</span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              <table className={styles.PerformingRatingScale}>
                <tr>
                  <td className={styles.Firsrtd}>5</td>
                  <td className={styles.Secondtd}>Exceptional</td>
                </tr>
                <tr>
                  <td className={styles.Firsrtd}>4</td>
                  <td className={styles.Secondtd}>Exceeds Expectations</td>
                </tr>
                <tr>
                  <td className={styles.Firsrtd}>3</td>
                  <td className={styles.Secondtd}>Performs Well</td>
                </tr>
                <tr>
                  <td className={styles.Firsrtd}>2</td>
                  <td className={styles.Secondtd}>Needs Improvement</td>
                </tr>
                <tr>
                  <td className={styles.Firsrtd}>1</td>
                  <td className={styles.Secondtd}>Unsatisfactory</td>
                </tr>
              </table>
            </div>
          </div>

          {/* //section 3  Category1 - Service Delivery */}

          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  A.Annual Review Performance Rating
                </span>
              </div>
            </div>
            <div className={styles.sectionHeader1}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  Category 1 - Service Delivery
                </span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              <table className={styles.ReviewTable} cellSpacing={0}>
                <thead>
                  <tr>
                    <th className={styles.sNo}> </th>
                    <th className={styles.Metric}>Metric</th>
                    <th className={styles.PrimaryReviewer}>
                      Preliminary/Additional Reviewer
                    </th>
                    <th className={styles.AdditionalReviewer}>
                      Final Reviewer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Quality of Work</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        selectedKey={reviewFormData.C101PRR}
                        onChange={(e, choice) => {
                          onChange("C101PRR", choice.text);
                        }}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C101ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C101ARR}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>2.</td>
                    <td>Effective Communication</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C102PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C102PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C102ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C102ARR}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Decision Making</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C103PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C103PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C103ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C103ARR}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td>Responsiveness/Sense of Urgency</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C104PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C104PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C104ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C104ARR}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>5.</td>
                    <td>Results Orientation</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C105PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C105PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C105ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C105ARR}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>6.</td>
                    <td>Project Administration</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C106PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C106PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C106ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C106ARR}
                      />
                    </td>
                  </tr>
                  <tr className={styles.Total}>
                    <td
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        borderLeft: "thin solid #ddd",
                        borderTop: "thin solid #ddd",
                        borderBottom: "thin solid #ddd",
                      }}
                      colSpan={2}
                    >
                      Service Delivery Total
                    </td>
                    <td
                      style={{
                        // borderLeft: "thin solid",
                        fontWeight: 500,
                        paddingLeft: "25px",
                        borderTop: "thin solid #ddd",
                        borderBottom: "thin solid #ddd",
                      }}
                    >
                      {reviewFormData.C1PRTotal ? reviewFormData.C1PRTotal : 0}
                    </td>
                    <td
                      style={{
                        fontWeight: 500,
                        paddingLeft: "25px",

                        borderRight: "thin solid #ddd",
                        borderTop: "thin solid #ddd",
                        borderBottom: "thin solid #ddd",
                      }}
                    >
                      {reviewFormData.C1ARTotal ? reviewFormData.C1ARTotal : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="" style={{ margin: "30px 0px" }}>
                <div className={styles.commentbox}>
                  <TextField
                    multiline
                    rows={12}
                    styles={boxTextField}
                    label="Staff Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Reviewee"
                        ? false
                        : true
                    }
                    onChange={(e, val) => {
                      onChange("SDstaffComments", val);
                    }}
                    value={reviewFormData.SDstaffComments}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Preliminary/Additional Reviewer Comments"
                    disabled={
                      reviewFormData.Status ==
                      "Awaiting Preliminary/Additional Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.C1PRComments}
                    onChange={(e, val) => {
                      onChange("C1PRComments", val);
                    }}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Final Reviewer Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Final Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.C1ARComments}
                    onChange={(e, val) => {
                      onChange("C1ARComments", val);
                    }}
                  ></TextField>
                </div>
              </div>
            </div>
          </div>

          {/* //section 4     Category2 - Teamwork and Leadership*/}

          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader1}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  Category 2 - Teamwork and Leadership
                </span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              {/* new design */}
              <table className={styles.ReviewTable}>
                <thead>
                  <tr>
                    <th className={styles.sNo}> </th>
                    <th className={styles.Metric}>Metric</th>
                    <th className={styles.PrimaryReviewer}>
                      {" "}
                      Preliminary/Additional Reviewer
                    </th>
                    <th className={styles.AdditionalReviewer}>
                      Final Reviewer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>7.</td>
                    <td>Adaptability</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C207PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C207PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C207ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C207ARR}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>8.</td>
                    <td>Cultivates an Entrepreneurial Spirit</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C208PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C208PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C208ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C208ARR}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>9.</td>
                    <td>Ethics and Values</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C209PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C209PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C209ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C209ARR}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>10.</td>
                    <td>Teamwork/Collaboration</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C210PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C210PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C210ARR", choice.text);
                        }}
                        selectedKey={reviewFormData.C210ARR}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>11.</td>
                    <td>Self-Development</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                        onChange={(e, choice) => {
                          onChange("C211PRR", choice.text);
                        }}
                        selectedKey={reviewFormData.C211PRR}
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                        selectedKey={reviewFormData.C211ARR}
                        onChange={(e, choice) => {
                          onChange("C211ARR", choice.text);
                        }}
                      />
                    </td>
                  </tr>

                  <tr className={styles.Total}>
                    <td
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        borderLeft: "thin solid #ddd",
                        borderTop: "thin solid #ddd",
                        borderBottom: "thin solid #ddd",
                      }}
                      colSpan={2}
                    >
                      Teamwork and Leadership Total
                    </td>
                    <td
                      style={{
                        // borderLeft: "thin solid",
                        fontWeight: 500,
                        paddingLeft: "25px",
                        borderTop: "thin solid #ddd",
                        borderBottom: "thin solid #ddd",
                      }}
                    >
                      {reviewFormData.C2PRTotal ? reviewFormData.C2PRTotal : 0}
                    </td>
                    <td
                      style={{
                        fontWeight: 500,
                        paddingLeft: "25px",

                        borderRight: "thin solid #ddd",
                        borderTop: "thin solid #ddd",
                        borderBottom: "thin solid #ddd",
                      }}
                    >
                      {reviewFormData.C2ARTotal ? reviewFormData.C2ARTotal : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="" style={{ margin: "30px 0px" }}>
                <div className={styles.commentbox}>
                  <TextField
                    rows={12}
                    multiline
                    styles={boxTextField}
                    label="Staff Comments"
                    onChange={(e, val) => {
                      onChange("TLstaffComments", val);
                    }}
                    disabled={
                      reviewFormData.Status == "Awaiting Reviewee"
                        ? false
                        : true
                    }
                    value={reviewFormData.TLstaffComments}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Preliminary/Additional Reviewer Comments"
                    disabled={
                      reviewFormData.Status ==
                      "Awaiting Preliminary/Additional Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.C2PRComments}
                    onChange={(e, val) => {
                      onChange("C2PRComments", val);
                    }}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Final Reviewer Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Final Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.C2ARComments}
                    onChange={(e, val) => {
                      onChange("C2ARComments", val);
                    }}
                  ></TextField>
                </div>
              </div>
            </div>
          </div>

          {/* section 5  Category3 - TechnicalSkill */}

          {/* <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader1}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  Category3 - TechnicalSkill
                </span>
              </div>
            </div>
            <div className={styles.sectionContent}>
           

           

              <table className={styles.ReviewTable}>
                <thead>
                  <tr>
                    <th className={styles.sNo}> </th>
                    <th className={styles.Metric}>Metric</th>
                    <th className={styles.PrimaryReviewer}>Primary Reviewer</th>
                    <th className={styles.AdditionalReviewer}>
                      Additional Reviewer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12a.</td>
                    <td> Technical Skill Dynamic</td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Reviewee"
                            ? true
                            : false
                        }
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Reviewee"
                            ? true
                            : false
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>12b.</td>
                    <td></td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Reviewee"
                            ? true
                            : false
                        }
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Reviewee"
                            ? true
                            : false
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>12c.</td>
                    <td></td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Reviewee"
                            ? true
                            : false
                        }
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Reviewee"
                            ? true
                            : false
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>12d.</td>
                    <td></td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Reviewee"
                            ? true
                            : false
                        }
                      />
                    </td>
                    <td>
                      <Dropdown
                        styles={dropDownStyles}
                        options={Ratingoptions}
                        disabled={
                          reviewFormData.Status == "Awaiting Reviewee"
                            ? true
                            : false
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={2}>Technical Skill Total</td>
                    <td>0.00</td>
                    <td> 0.00</td>
                  </tr>
                </tbody>
              </table>
              <div className="" style={{ margin: "30px 0px" }}>
                <div className={styles.commentbox}>
                  <TextField
                    multiline
                    styles={boxTextField}
                    label="Staff Comments"
                    onChange={(e, val) => {
                      onChange("TSstaffComments", val);
                    }}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    styles={boxTextField1}
                    multiline
                    label="Preliminary/Additional ReviewerComments
:"
                    disabled={
                      reviewFormData.Status == "Awaiting Reviewee"
                        ? true
                        : false
                    }
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    styles={boxTextField1}
                    multiline
                    label="Additional Reviewer Comments:"
                    disabled={
                      reviewFormData.Status == "Awaiting Reviewee"
                        ? true
                        : false
                    }
                  ></TextField>
                </div>
              </div>
            </div>
          </div> */}

          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeader1}>
                <div className={styles.colHeader100}>
                  <span className={styles.subTitle}>
                    Category 3 - Technical Skills
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.sectionNotes}>
              <p>
                Reviewee should select the technical skills they expect to be
                evaluated on in the drop down menu below.  Three to five skills
                are optimal, but you can select up to seven.  It’s preferable
                that you discuss your selections with your reviewer in advance. 
                The final selection of technical skills is at the discretion of
                the Reviewer who may change, remove, or add to the selections
                and rate them individually. An overall rating is calculated by
                the form but can be overridden by the Reviewer.
              </p>
            </div>
            <div className={styles.sectionContent}>
              {reviewFormData.isEdit == false && (
                <div className={styles.addTechnicalSkill}>
                  <div className={styles.col100}>
                    <div className={styles.row}>
                      <div className={styles.col100}>
                        <label className={styles.boldlabel}>
                          Add Technical Skill Rating
                        </label>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className={styles.col50left}>
                        <Dropdown
                          placeholder="Select Technical Skill"
                          options={ddData}
                          // options={TSOptions.map((option) => ({
                          //   ...option,
                          //   disabled:
                          //   option.key == reviewFormData.TechnicalSkillName,
                          // }))}
                          selectedKey={reviewFormData.TechnicalSkillName}
                          onChange={(e, choice) => {
                            onChange("TechnicalSkillName", choice.text);

                            DropdownHide();
                            //  TSOptions = TSOptions.forEach((option) => {
                            //     if (option.key == choice.text) {
                            //        option.disable = true;
                            //     }

                            //     // // ...option,
                            //     // option["disable"] =
                            //     //   option.key == choice.text ? true : false,
                            //   });
                            // let temp = ddData;
                            // for (var i = 0; i < temp.length; i++) {
                            //   if (temp[i].key == choice.text) {
                            //     temp[i].disable = true;
                            //   }
                            // }

                            // setddData([...temp]);
                            // // console.log(ddData);
                          }}
                          disabled={
                            reviewFormData.Status == "Awaiting Reviewee"
                              ? false
                              : reviewFormData.Status ==
                                "Awaiting Preliminary/Additional Reviewer"
                              ? false
                              : reviewFormData.Status ==
                                "Awaiting Final Reviewer"
                              ? false
                              : true
                          }
                        />
                      </div>

                      {/* <div className={styles.col15left}>
                        <Dropdown
                          placeholder="Select Rating"
                          options={Ratingoptions}
                          onChange={(e, choice) => {
                            onChange("TechnicalSkillRating", choice.text);
                          }}
                          disabled={
                            reviewFormData.Status == "Awaiting Reviewee"
                              ? false
                              : true
                          }
                        />
                      </div> */}

                      {/* <div className={styles.col15left}>
                        <Dropdown
                          placeholder="Select Rating"
                          options={Ratingoptions}
                          onChange={(e, choice) => {
                            onChange("TSRating1", choice.text);
                          }}
                          disabled={
                            reviewFormData.Status == "Awaiting Reviewee"
                              ? false
                              : true
                          }
                        />
                      </div> */}

                      <div
                        className={styles.col35left}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <PrimaryButton
                          text="Add"
                          onClick={addTechnicalSkill}
                          disabled={
                            reviewFormData.TechnicalSkillName != ""
                              ? false
                              : true
                          }
                        />

                        <PrimaryButton
                          text="Edit Technical Skills"
                          onClick={() => {
                            reviewFormData.isEdit = true;
                            reviewFormData.modifiedSelectedTechnicalName =
                              reviewFormData.masterSelectedTechnicalName;
                            setReviewFormData({ ...reviewFormData });
                            DropdownHide();
                          }}
                          disabled={
                            reviewFormData.Status == "Awaiting Acknowledgement"
                              ? true
                              : reviewFormData.Status == "Acknowledged"
                              ? true
                              : reviewFormData.Status == ""
                              ? true
                              : reviewFormData.Status == "Awaiting Reviewee"
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {reviewFormData.isEdit && (
                <div className={styles.addTechnicalSkill}>
                  <div className={styles.row}>
                    <div className={styles.col50left}></div>
                    <div className={styles.col50right}>
                      <PrimaryButton
                        text="Save Changes"
                        onClick={() => {
                          AddTechnicalTotal(
                            reviewFormData.masterSelectedTechnicalName
                          );
                          let _reviewFormData = { ...reviewFormData };
                          _reviewFormData.isEdit = false;
                          _reviewFormData.masterSelectedTechnicalName = [
                            ...reviewFormData.modifiedSelectedTechnicalName,
                          ];
                          setReviewFormData({ ..._reviewFormData });
                          DropdownHide();
                        }}
                      />
                      &nbsp;
                      <DefaultButton
                        text="Cancel Editing"
                        onClick={() => {
                          reviewFormData.isEdit = false;
                          // reviewFormData.SelectedTechnicalName =
                          //   reviewFormData.SelectedTechnicalName;
                          setReviewFormData({ ...reviewFormData });
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <table className={styles.technicalskilltable}>
                <thead>
                  <tr>
                    <th className={styles.colskill}>
                      <Label className={styles.boldlabel}>
                        Technical Skill Evaluated
                      </Label>
                    </th>
                    <th className={styles.colrating}>
                      <Label className={styles.boldlabel}>
                        Preliminary/Additional Reviewer Rating
                      </Label>
                    </th>
                    <th className={styles.colrating}>
                      <Label className={styles.boldlabel}>
                        Final Reviewer Rating
                      </Label>
                    </th>
                    {reviewFormData.Status == "Awaiting Reviewee" && (
                      <th className={styles.colOperations}>&nbsp;</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {
                    //Case: When there is no data
                    reviewFormData.masterSelectedTechnicalName.length == 0 && (
                      <tr>
                        <td className={styles.colskill}>&nbsp;</td>
                        <td className={styles.colTechSkillRating}>&nbsp;</td>
                        <td className={styles.colTechSkillRating}>&nbsp;</td>

                        <td className={styles.colOperations}>&nbsp;</td>
                      </tr>
                    )
                  }
                  {reviewFormData.isEdit == false &&
                    reviewFormData.masterSelectedTechnicalName.length > 0 &&
                    reviewFormData.masterSelectedTechnicalName.map(
                      (data, index) => (
                        <tr>
                          <td className={styles.colskill}>
                            <Label className={styles.normalLabel}>
                              {data.TechinicalSkillName}
                            </Label>
                          </td>
                          <td className={styles.colrating}>
                            <Label className={styles.normalLabel}>
                              {data.TechnicalSkillRating}
                            </Label>
                          </td>
                          <td className={styles.colrating}>
                            <Label className={styles.normalLabel}>
                              {data.TSRating1}
                            </Label>
                          </td>

                          {reviewFormData.Status == "Awaiting Reviewee" && (
                            <td className={styles.colOperations}>
                              <IconButton
                                title="Delete"
                                ariaLabel="Delete"
                                iconProps={{ iconName: "Delete" }}
                                onClick={() => deleteTechnicallSkillName(index)}
                              />
                            </td>
                          )}
                        </tr>
                      )
                    )}
                  {reviewFormData.isEdit &&
                    reviewFormData.masterSelectedTechnicalName.length > 0 &&
                    reviewFormData.masterSelectedTechnicalName.map(
                      (data, index) => (
                        <tr>
                          <td className={styles.colskillEdit}>
                            {/* <div className={styles.row}> */}
                            {/* <div className={styles.col75left}> */}
                            <Dropdown
                              placeholder="Select Technical Skill"
                              options={TSOptions}
                              selectedKey={data.TechinicalSkillName}
                              onChange={(e, value) => {
                                onChangeTechnicalName(
                                  `modifiedSelectedTechnicalName`,
                                  index,
                                  value.key,
                                  "TechinicalSkillName"
                                );
                                console.log(value);
                              }}
                              disabled={
                                reviewFormData.Status == "Awaiting Reviewee"
                                  ? true
                                  : false
                              }
                            />
                            {/* </div> */}
                            {/* </div> */}
                          </td>
                          <td className={styles.colRatingEdit}>
                            <Dropdown
                              placeholder="Select Rating"
                              options={Ratingoptions}
                              selectedKey={data.TechnicalSkillRating}
                              onChange={(e, value) => {
                                onChangeTechnicalName(
                                  `modifiedSelectedTechnicalName`,
                                  index,
                                  value.key,
                                  "TechnicalSkillRating"
                                );
                              }}
                              disabled={
                                reviewFormData.Status ==
                                "Awaiting Preliminary/Additional Reviewer"
                                  ? false
                                  : true
                              }
                            />
                          </td>
                          <td className={styles.colRatingEdit}>
                            <Dropdown
                              placeholder="Select Rating"
                              options={Ratingoptions}
                              selectedKey={data.TSRating1}
                              onChange={(e, value) => {
                                AddTechnicalTotal(
                                  reviewFormData.masterSelectedTechnicalName
                                );
                                onChangeTechnicalName(
                                  `modifiedSelectedTechnicalName`,
                                  index,
                                  value.key,
                                  "TSRating1"
                                );

                                // console.log(value);
                              }}
                              disabled={
                                reviewFormData.Status ==
                                "Awaiting Final Reviewer"
                                  ? false
                                  : true
                              }
                            />
                          </td>
                        </tr>
                      )
                    )}

                  <tr>
                    <td className={styles.colskill}>
                      <Label className={styles.boldmargin15}>
                        Calculated Overall Technical Skills Rating
                      </Label>
                    </td>
                    <td className={styles.colrating} colSpan={1}>
                      <Label className={styles.boldlabel}>
                        {reviewFormData.CalculatedTsRating
                          ? reviewFormData.CalculatedTsRating
                          : 0}
                      </Label>
                    </td>
                    <td className={styles.colrating} colSpan={1}>
                      <Label className={styles.boldlabel}>
                        {reviewFormData.CalculatedOverallTs2
                          ? reviewFormData.CalculatedOverallTs2
                          : 0}
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.colskill}>
                      <Label className={styles.boldmargin15}>
                        Overall Technical Skills Rating
                      </Label>
                    </td>
                    <td className={styles.colrating} colSpan={1}>
                      <Dropdown
                        options={Ratingoptions}
                        selectedKey={reviewFormData.OverallTSRating}
                        onChange={(e, value) => {
                          onChange("OverallTSRating", value.text);

                          // console.log(value);
                        }}
                        disabled={
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : true
                        }
                      />
                    </td>
                    <td className={styles.colrating} colSpan={1}>
                      <Dropdown
                        options={Ratingoptions}
                        selectedKey={reviewFormData.OverallTsRating2}
                        onChange={(e, value) => {
                          onChange("OverallTsRating2", value.text);

                          // console.log(value);
                        }}
                        disabled={
                          reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className={styles.row} hidden={true}>
                <div className={styles.col100}>
                  <Label>
                    Reasons for Override of Calculated Rating (
                    <i>
                      If the overall rating differs by more than .5 from the
                      calculated rating, an explanation for the variance must be
                      provided in the box below
                    </i>
                    ):
                  </Label>
                  <TextField resizable={false} multiline={true}></TextField>
                </div>
              </div>
              <div className={styles.AddPageBreak}></div>

              <div className="" style={{ margin: "30px 0px" }}>
                <div className={styles.commentbox}>
                  <TextField
                    rows={12}
                    multiline
                    styles={boxTextField}
                    label="Staff Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Reviewee"
                        ? false
                        : true
                    }
                    onChange={(e, val) => {
                      onChange("TSstaffComments", val);
                    }}
                    value={reviewFormData.TSstaffComments}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Preliminary/Additional Reviewer Comments"
                    disabled={
                      reviewFormData.Status ==
                      "Awaiting Preliminary/Additional Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.TechnicalSkillPRComments}
                    onChange={(e, val) => {
                      onChange("TechnicalSkillPRComments", val);
                    }}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Final Reviewer Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Final Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.TechnicalSkillARComments}
                    onChange={(e, val) => {
                      onChange("TechnicalSkillARComments", val);
                    }}
                  ></TextField>
                </div>
              </div>
            </div>
          </div>
          {/* neworder to */}

          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  B. Goals & Training/Development Opportunities
                </span>
              </div>
            </div>
            <div className={styles.sectionHeader1}>
              {/* <div className={styles.colHeader100}>
            <span className={styles.subTitle}>
             
            </span>
            </div> */}
            </div>
            <div className={styles.sectionContent}>
              {/* new design */}

              <div className="" style={{ margin: "30px 0px" }}>
                <div className={styles.commentbox}>
                  <TextField
                    rows={12}
                    multiline
                    styles={boxTextField}
                    label="Staff Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Reviewee"
                        ? false
                        : true
                    }
                    onChange={(e, val) => {
                      onChange("GoalsstaffComments", val);
                    }}
                    value={reviewFormData.GoalsstaffComments}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Preliminary/Additional Reviewer Comments"
                    disabled={
                      reviewFormData.Status ==
                      "Awaiting Preliminary/Additional Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.GoalsPRComments}
                    onChange={(e, val) => {
                      onChange("GoalsPRComments", val);
                    }}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Final Reviewer Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Final Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.GoalsARComments}
                    onChange={(e, val) => {
                      onChange("GoalsARComments", val);
                    }}
                  ></TextField>
                </div>
              </div>
              {/* date with table */}
            </div>
          </div>

          {/* section 6  B.Additional/Overall comments */}
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  {/* B.Additional/Overall comments */}
                  C.Additional/Overall comments
                </span>
              </div>
            </div>
            <div className={styles.sectionHeader1}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  {/* Category1 - Service Delivery */}
                </span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              {/* <div className={styles.innerTable}>
            <div className={styles.box}>
             
              <TextField
                multiline
                styles={boxTextField}
                label="Staff Comments"
              ></TextField>
            </div>
            <div className={styles.box}>
              <TextField
                styles={boxTextField1}
                multiline
                label="Reviewer 1 Comments:"
              ></TextField>

              <TextField
                styles={boxTextField1}
                multiline
                label="Reviewer 2 Comments:"
              ></TextField>
            </div>
          </div> */}
              {/* newdesign */}

              <div className="" style={{ margin: "30px 0px" }}>
                <div className={styles.commentbox}>
                  <TextField
                    rows={12}
                    multiline
                    styles={boxTextField}
                    label="Staff Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Reviewee"
                        ? false
                        : true
                    }
                    onChange={(e, val) => {
                      onChange("OverallstaffComments", val);
                    }}
                    value={reviewFormData.OverallstaffComments}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Preliminary/Additional Reviewer Comments"
                    disabled={
                      reviewFormData.Status ==
                      "Awaiting Preliminary/Additional Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.AdditionalPRComments}
                    onChange={(e, val) => {
                      onChange("AdditionalPRComments", val);
                    }}
                  ></TextField>
                </div>
                <div className={styles.commentbox}>
                  <TextField
                    // styles={boxTextField1}
                    styles={boxTextField}
                    rows={12}
                    multiline
                    label="Final Reviewer Comments"
                    disabled={
                      reviewFormData.Status == "Awaiting Final Reviewer"
                        ? false
                        : true
                    }
                    value={reviewFormData.AdditionalARComments}
                    onChange={(e, val) => {
                      onChange("AdditionalARComments", val);
                    }}
                  ></TextField>
                </div>
              </div>
            </div>
          </div>

          {/* section 7   C.Overall Annual Review Performance rating*/}
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  D.Overall Annual Review Performance rating
                </span>
              </div>
            </div>
            <div className={styles.sectionHeader1}>
              <div className={styles.colHeader100}>
                <span className={styles.subTitle}>
                  {/* Category1 - Service Delivery */}
                </span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              <table className={styles.OverallTable}>
                <tbody>
                  <tr>
                    <td colSpan={4}>Calculated Overall Rating</td>
                  </tr>
                  <tr>
                    <td colSpan={1}> Preliminary/Additional Reviewer</td>
                    <td colSpan={1}>
                      {reviewFormData.OverallPRRating
                        ? reviewFormData.OverallPRRating
                        : 0}
                    </td>
                    <td colSpan={1}>Final Reviewer</td>
                    <td colSpan={1}>
                      {reviewFormData.OverallARRating
                        ? reviewFormData.OverallARRating
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Awarded Overall Rating</td>
                    <td colSpan={2}>
                      <Dropdown
                        options={Ratingoptions}
                        selectedKey={reviewFormData.AwardOverallRating}
                        onChange={(e, value) => {
                          onChange("AwardOverallRating", value.text);

                          // console.log(value);
                        }}
                        disabled={
                          // reviewFormData.Status == "Awaiting Reviewee"
                          //   ? false
                          //   :
                          reviewFormData.Status ==
                          "Awaiting Preliminary/Additional Reviewer"
                            ? false
                            : reviewFormData.Status == "Awaiting Final Reviewer"
                            ? false
                            : true
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* section 8  D.Goals and Training/Development Opportunities* this is moved to top/}

          {/* newchanges today */}
          <div>
            <table
              // className={styles.PerformingRatingScale}
              style={{
                width: "100%",
              }}
            >
              <tbody>
                {/* <tr>
                  <td> Preliminary/Additional Reviewer Discussion Date</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DatePicker
                      styles={Datepickerstyle}
                      value={
                        reviewFormData.GoalsPRDate
                          ? new Date(reviewFormData.GoalsPRDate)
                          : null
                      }
                      formatDate={() => {
                        return moment(reviewFormData.GoalsPRDate).format(
                          "MM/DD/YYYY"
                        );
                      }}
                      disabled={
                        reviewFormData.Status ==
                        "Awaiting Preliminary/Additional Reviewer"
                          ? false
                          : true
                      }
                      onSelectDate={(b) => {
                        onChange("GoalsPRDate", b);
                      }}
                    />
                  </td>
                </tr> */}
                <tr>
                  <td>Final Reviewer Discussion Date</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DatePicker
                      styles={Datepickerstyle}
                      value={
                        reviewFormData.GoalsARDate
                          ? new Date(reviewFormData.GoalsARDate)
                          : null
                      }
                      formatDate={() => {
                        return moment(reviewFormData.GoalsARDate).format(
                          "MM/DD/YYYY"
                        );
                      }}
                      disabled={
                        reviewFormData.Status == "Awaiting Final Reviewer"
                          ? false
                          : true
                      }
                      onSelectDate={(b) => {
                        onChange("GoalsARDate", b);
                      }}
                      // isRequired={true}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* revert comments */}

          <div className={styles.commentbox}>
            <TextField
              // styles={boxTextField1}
              styles={boxTextField}
              rows={12}
              multiline
              label="Revert Review Comments"
              // disabled={
              //   reviewFormData.Status == "Awaiting Additional Reviewer"
              //     ? false
              //     : true
              // }
              disabled={
                reviewFormData.Status == "Awaiting Final Reviewer"
                  ? false
                  : reviewFormData.Status ==
                    "Awaiting Preliminary/Additional Reviewer"
                  ? false
                  : true
              }
              value={reviewFormData.ReverComments}
              onChange={(e, val) => {
                onChange("ReverComments", val);
              }}
            ></TextField>
          </div>

          {/* awaiting Acknowledged comments */}

          {reviewFormData.Status == "Awaiting Acknowledgement" && (
            <div className={styles.commentbox}>
              <TextField
                styles={boxTextField}
                rows={12}
                multiline
                label="Acknowledgement Comments"
                onChange={(e, val) => {
                  onChange("AwaitingAknowledgeComments", val);
                }}
                value={reviewFormData.AwaitingAknowledgeComments}
              ></TextField>
            </div>
          )}

          {/* comment */}
          <div className={styles.commentbox}>
            <TextField
              styles={boxTextField}
              rows={12}
              multiline
              label="History"
              readOnly
              disabled={
                reviewFormData.Status == "Awaiting Acknowledgement"
                  ? true
                  : false
              }
              onChange={(e, val) => {
                onChange("GoalsHistory", val);
              }}
              value={reviewFormData.GoalsHistory}
            ></TextField>
          </div>

          {/* buttons */}
          <div className={styles.row}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "50px",
              }}
            >
              {reviewFormData.Status == "Awaiting Acknowledgement" ||
              reviewFormData.Status == "Acknowledged" ||
              reviewFormData.Status == "" ? (
                " "
              ) : (
                <PrimaryButton
                  text="Save"
                  onClick={() => {
                    OnSubmitFunction("Save");
                  }}
                />
              )}

              <PrimaryButton
                text="Cancel"
                onClick={() => {
                  // init();
                  window.location.href =
                    "https://itinfoalvarezandmarsal.sharepoint.com/sites/DEV-DIPERFORMGMT/Lists/NonBillableReviews/AllItems.aspx";
                }}
              />
              {reviewFormData.Status == "Awaiting Acknowledgement" ||
              reviewFormData.Status == "Awaiting Reviewee" ||
              reviewFormData.Status == "Acknowledged" ||
              reviewFormData.Status == "" ? (
                ""
              ) : (
                <PrimaryButton
                  text="Revert"
                  onClick={() => {
                    OnSubmitFunction("Revert");
                  }}
                />
              )}

              <PrimaryButton
                text={
                  reviewFormData.Status == "Awaiting Acknowledgement"
                    ? "Acknowledged"
                    : reviewFormData.Status == "Acknowledged"
                    ? "Acknowledged"
                    : "Submit"
                }
                disabled={
                  reviewFormData.isSubmitDisabled || reviewFormData.Status == ""
                    ? true
                    : false
                }
                onClick={() => {
                  reviewFormData.Status == "Awaiting Acknowledgement"
                    ? OnSubmitFunction("Acknowledged")
                    : OnSubmitFunction("Submit");
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default MainComponent;
