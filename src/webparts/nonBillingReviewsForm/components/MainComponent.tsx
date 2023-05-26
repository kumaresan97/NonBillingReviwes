import * as React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import styles from "./NonBillingReviewsForm.module.scss";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  Checkbox,
  DatePicker,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  ITextFieldStyles,
  Label,
  PrimaryButton,
  TextField,
} from "@fluentui/react";

interface IForm {
  staffName: number;
  title: string;
  sbu: string;
  reviewer1: number;
  reviewer1Level: string;
  reviewer2: number;
  reviewer2Level: string;
  isValid: boolean;
}

const MainComponent = (props) => {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    email: "",
  });

  const [reviewFormData, setReviewFormData] = useState<IForm>({
    staffName: null,
    title: "",
    sbu: "",
    reviewer1: null,
    reviewer1Level: "",
    reviewer2: null,
    reviewer2Level: "",
    isValid: false,
  });
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
        height: 190,
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
      justifyContent: "center",
    },
    dropdown: {
      width: "50%",
    },
  };
  const TechnicalskillText = {
    root: {
      width: "100%",
    },
  };
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

    console.log(_reviewFormData);

    setReviewFormData({ ..._reviewFormData });
  };
  const getCurrentUser = () => {
    const CurrentUser = props.context.pageContext.user.email;
    props.sp.web.currentUser().then((e) => {
      let data = reviewFormData;
      if (e) {
        data.staffName = e.Id;
        setCurrentUser({ id: e.Id, email: e.Email });
        setReviewFormData({ ...data });
      }
    });
  };

  const onStartReview = async () => {
    debugger;
    props.sp.web.lists
      .getByTitle("NonBillingReviews")
      .items.add({
        Staff_x0020_NameId: currentUser.id,
        Staff_x0020_Job_x0020_Title: reviewFormData.title,
        SBU: reviewFormData.sbu,
        Reviewer1NameId: reviewFormData.reviewer1,
        Reviewer2NameId: reviewFormData.reviewer2,
        Reviewer1Level: reviewFormData.reviewer1Level,
        Reviewer2Level: reviewFormData.reviewer2Level,
      })
      .then((i) => {
        console.log(i);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getCurrentUser();
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
              <PeoplePicker
                context={props.context}
                personSelectionLimit={1}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                // required={true}
                disabled={true}
                ensureUser={true}
                showHiddenInUI={false}
                defaultSelectedUsers={[currentUser.email]}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
                // selectedItems={(e: any) => {
                //   onChange("staffName", e.length > 0 ? e[0].id : null);
                // }}
              />
            </div>
            <div className={styles.col25Right}>
              <Label> Title:</Label>
            </div>
            <div className={styles.col25left}>
              <Dropdown
                placeholder="Select Job Title"
                options={jobTitleOptions}
                selectedKey={reviewFormData.title}
                onChange={(e, choice) => {
                  onChange("title", choice.key);
                }}
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
              <Label>Reviewer 1 Name:</Label>
            </div>
            <div className={styles.col25left}>
              <PeoplePicker
                context={props.context}
                personSelectionLimit={1}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                // required={true}
                ensureUser={true}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                // defaultSelectedUsers={[
                //   this.state.ReviewDetails.BasicDetails.Reviewer.Email,
                // ]}
                resolveDelay={1000}
                selectedItems={(e: any) => {
                  onChange("reviewer1", e.length > 0 ? e[0].id : null);
                }}
              />
            </div>
            <div className={styles.col25Right}>
              <Label>Reviewer 1 Level:</Label>
            </div>
            <div className={styles.col25left}>
              <Dropdown
                placeholder="Select Job Title"
                options={jobTitleOptions}
                selectedKey={reviewFormData.reviewer1Level}
                onChange={(e, choice) => {
                  onChange("reviewer1Level", choice.key);
                }}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col25Right}>
              <Label>Reviewer2 Name:</Label>
            </div>
            <div className={styles.col25left}>
              <PeoplePicker
                context={props.context}
                personSelectionLimit={1}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                // required={true}
                ensureUser={true}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                // defaultSelectedUsers={[
                //   this.state.ReviewDetails.BasicDetails.Reviewer.Email,
                // ]}
                selectedItems={(e: any) => {
                  onChange("reviewer2", e.length > 0 ? e[0].id : null);
                }}
                resolveDelay={1000}
              />
            </div>
            <div className={styles.col25Right}>
              <Label>Reviewer2 Level:</Label>
            </div>
            <div className={styles.col25left}>
              <Dropdown
                placeholder="Select Job Title"
                options={jobTitleOptions}
                selectedKey={reviewFormData.reviewer2Level}
                onChange={(e, choice) => {
                  onChange("reviewer2Level", choice.key);
                }}
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
        </div>
      </div>

      {/* section 2   Performing Rating Scale*/}
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
              Category1 - Service Delivery
            </span>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.innerTable}>
            <div className={styles.box}>
              <table className={styles.ServiceDelivery}>
                <tr className={styles.rows}>
                  <th className={styles.wideCell}>Metric</th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />1
                  </th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />2
                  </th>
                </tr>
                <tr className={styles.rows}>
                  <td>1.Quality of work</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td>2.Effective Communication</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td>3.Decision making</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
              </table>
            </div>
            <div className={styles.box}>
              <table className={styles.ServiceDelivery}>
                <tr className={styles.rows}>
                  <th className={styles.wideCell}></th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />1
                  </th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />2
                  </th>
                </tr>
                <tr className={styles.rows}>
                  <td>4.Responsiveness /Sence of urgency</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td>5.Result Orientation</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td>6.Project Adminstation</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className={styles.innerTable}>
            <div className={styles.box}>
              {/* <h5>Staff Comments:</h5> */}
              <TextField
                multiline
                styles={boxTextField}
                label="Staff Comments"
              ></TextField>
            </div>
            <div className={styles.box}>
              {/* <h5>Staff Comments:</h5> */}
              <TextField
                styles={boxTextField1}
                multiline
                label="Reviewer 1 Comments:"
              ></TextField>
              {/* <h5>Staff Comments:</h5> */}
              <TextField
                styles={boxTextField1}
                multiline
                label="Reviewer 2 Comments:"
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
              Category2 - Teamwork and Leadership
            </span>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.innerTable}>
            <div className={styles.box}>
              <table className={styles.ServiceDelivery}>
                <tr className={styles.rows}>
                  <th className={styles.wideCell}>Metric</th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />1
                  </th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />2
                  </th>
                </tr>
                <tr className={styles.rows}>
                  <td>7.Adaptability</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown
                      styles={dropDownStyles}
                      options={jobTitleOptions}
                    />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td>8.Cultivates an Entrepreneurial Spirit</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    {/* <select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select> */}
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td>9.Ethics and Values</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
              </table>
            </div>
            <div className={styles.box}>
              <table className={styles.ServiceDelivery}>
                <tr className={styles.rows}>
                  <th className={styles.wideCell}></th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />1
                  </th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />2
                  </th>
                </tr>
                <tr className={styles.rows}>
                  <td>10.Teamwork/Collaboration</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td>11.Self-Development</td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className={styles.innerTable}>
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
          </div>
        </div>
      </div>

      {/* section 5  Category3 - TechnicalSkill */}

      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader1}>
          <div className={styles.colHeader100}>
            <span className={styles.subTitle}>Category3 - TechnicalSkill</span>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.innerTable}>
            <div className={styles.box}>
              <table className={styles.ServiceDelivery}>
                <tr className={styles.rows}>
                  <th className={styles.wideCell}>Metric</th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />1
                  </th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />2
                  </th>
                </tr>
                <tr className={styles.rows}>
                  <td className={styles.technicalskilltd}>
                    <p>12</p> <TextField styles={TechnicalskillText} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td className={styles.technicalskilltd}>
                    <p>12a</p>
                    <TextField styles={TechnicalskillText}></TextField>
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
              </table>
            </div>
            <div className={styles.box}>
              <table className={styles.ServiceDelivery}>
                <tr className={styles.rows}>
                  <th className={styles.wideCell}></th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />1
                  </th>
                  <th className={styles.wideCelltd}>
                    Reviewer <br />2
                  </th>
                </tr>
                <tr className={styles.rows}>
                  <td className={styles.technicalskilltd}>
                    <p>12</p>
                    <TextField styles={TechnicalskillText} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
                <tr className={styles.rows}>
                  <td className={styles.technicalskilltd}>
                    <p>12</p>
                    <TextField styles={TechnicalskillText} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                  <td
                    className={styles.wideCelltd}
                    style={{ textAlign: "center" }}
                  >
                    <Dropdown styles={dropDownStyles} options={Ratingoptions} />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className={styles.innerTable}>
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
          </div>
        </div>
      </div>

      {/* section 6  B.Additional/Overall comments */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.colHeader100}>
            <span className={styles.subTitle}>
              B.Additional/Overall comments
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
          <div className={styles.innerTable}>
            <div className={styles.box}>
              {/* <h5>Staff Comments:</h5> */}
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
          </div>
        </div>
      </div>

      {/* section 7   C.Overall Annual Review Performance rating*/}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.colHeader100}>
            <span className={styles.subTitle}>
              C.Overall Annual Review Performance rating
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
          <table>
            <tr className={styles.rows}>
              <th style={{ width: "30%" }}></th>
              <th style={{ width: "20%" }}>Reviewer Evaluation</th>
            </tr>
            <tr>
              <td>Overall Performance Rating</td>
              <td>
                <Dropdown options={Ratingoptions} styles={dropDownStyles} />
              </td>
            </tr>
          </table>
        </div>
      </div>

      {/* section 8  D.Goals and Training/Development Opportunities*/}

      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.colHeader100}>
            <span className={styles.subTitle}>
              D.goals Training/Development Opportunities
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
          <div className={styles.innerTable}>
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
          </div>
          {/* //aknowledge */}
          <div className={styles.row}>
            <div className={styles.col25Right}>
              <Label>
                Acknowledgement / <br></br>Electronic Signature:
              </Label>
            </div>
            <div className={styles.col25left}>
              <PeoplePicker
                context={props.context}
                personSelectionLimit={1}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                // required={true}
                ensureUser={true}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                // defaultSelectedUsers={[
                //   this.state.ReviewDetails.BasicDetails.Reviewer.Email,
                // ]}
                selectedItems={(e: any) => {
                  onChange("reviewer2", e.length > 0 ? e[0].id : null);
                }}
                resolveDelay={1000}
              />
              <Label>Staff Reviewer:</Label>
            </div>
            <div className={styles.col25Right}></div>
            <div className={styles.col25left}>
              <PeoplePicker
                context={props.context}
                personSelectionLimit={1}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                // required={true}
                ensureUser={true}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                // defaultSelectedUsers={[
                //   this.state.ReviewDetails.BasicDetails.Reviewer.Email,
                // ]}
                selectedItems={(e: any) => {
                  onChange("reviewer2", e.length > 0 ? e[0].id : null);
                }}
                resolveDelay={1000}
              />
              <Label>Reviewer1:</Label>
            </div>
            <div className={styles.row}>
              <div className={styles.col25Right}></div>
              <div className={styles.col25left}>
                <DatePicker />
                <Label>Date</Label>
              </div>
              <div className={styles.col25Right}></div>
              <div className={styles.col25left}>
                <DatePicker />
                <Label>Date</Label>
              </div>
            </div>

            {/* // */}
            <div className={styles.row}>
              <div className={styles.col25Right}></div>
              <div className={styles.col25left}></div>
              <div className={styles.col25Right}></div>
              <div className={styles.col25left}>
                <PeoplePicker
                  context={props.context}
                  personSelectionLimit={1}
                  groupName={""} // Leave this blank in case you want to filter from all users
                  showtooltip={true}
                  // required={true}
                  ensureUser={true}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  // defaultSelectedUsers={[
                  //   this.state.ReviewDetails.BasicDetails.Reviewer.Email,
                  // ]}
                  selectedItems={(e: any) => {
                    onChange("reviewer2", e.length > 0 ? e[0].id : null);
                  }}
                  resolveDelay={1000}
                />
                <Label>Reviewer2</Label>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col25Right}></div>
              <div className={styles.col25left}></div>
              <div className={styles.col25Right}></div>
              <div className={styles.col25left}>
                <DatePicker />
                <Label>Date</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainComponent;
