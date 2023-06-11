import * as React from "react";
import styles from "./NonBillingReviewsForm.module.scss";
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
} from "@fluentui/react";

const TechnicalSkill = () => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.colHeader100}>
          <span className={styles.subTitle}>Technical Skills</span>
        </div>
      </div>
      <div className={styles.sectionNotes}>
        <p>
          Reviewee should select the technical skills they expect to be
          evaluated on in the drop down menu below.  Three to five skills are
          optimal, but you can select up to seven.  It’s preferable that you
          discuss your selections with your reviewer in advance.  The final
          selection of technical skills is at the discretion of the Reviewer who
          may change, remove, or add to the selections and rate them
          individually. An overall rating is calculated by the form but can be
          overridden by the Reviewer.
        </p>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.addTechnicalSkill}>
          <div className={styles.col100}>
            <div className={styles.row}>
              <div className={styles.col100}>
                <label className={styles.boldlabel}>
                  Add Technical Skill Rating:
                </label>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col50left}>
                <Dropdown placeholder="Select Technical Skill" options={[]} />
              </div>

              <div className={styles.col15left}>
                <Dropdown placeholder="Select Rating" options={[]} />
              </div>
              <div className={styles.col35left}>
                <Stack horizontal={true}>
                  <PrimaryButton text="Add" />

                  <PrimaryButton
                    text="Edit Technical Skills"
                    onClick={() => {}}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.addTechnicalSkill}>
          <div className={styles.row}>
            <div className={styles.col50left}></div>
            <div className={styles.col50right}>
              <PrimaryButton text="Save Changes" />
              &nbsp;
              <DefaultButton text="Cancel Editing" />
            </div>
          </div>
        </div>

        <table className={styles.technicalskilltable}>
          <thead>
            <tr>
              <th className={styles.colskill}>
                <Label className={styles.boldlabel}>
                  Technical Skill Evaluated
                </Label>
              </th>
              <th className={styles.colrating}>
                <Label className={styles.boldlabel}>Reviewer Rating</Label>
              </th>

              <th className={styles.colOperations}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
              //Case: When there is no data

              <tr>
                <td className={styles.colskill}>&nbsp;</td>
                <td className={styles.colTechSkillRating}>&nbsp;</td>

                <td className={styles.colOperations}>&nbsp;</td>
              </tr>
            }
            <tr>
              <td className={styles.colskill}>
                <Label className={styles.normalLabel}>4</Label>
              </td>
              <td className={styles.colrating}>
                <Label className={styles.normalLabel}>1</Label>
              </td>

              <td className={styles.colOperations}>
                <IconButton title="Delete" ariaLabel="Delete" />
              </td>
            </tr>
            <tr>
              <td className={styles.colskillEdit}>
                <div className={styles.row}>
                  <div className={styles.col75left}>
                    <Dropdown
                      placeholder="Select Technical Skill"
                      options={[]}
                    />
                  </div>
                </div>
              </td>
              <td className={styles.colRatingEdit}>
                <Dropdown placeholder="Select Rating" options={[]} />
              </td>
            </tr>
            ;
            <tr>
              <td className={styles.colskill}>
                <Label className={styles.boldmargin15}>
                  Calculated Overall Technical Skills Rating
                </Label>
              </td>
              <td className={styles.colrating} colSpan={2}>
                <Label className={styles.boldlabel}></Label>
              </td>
            </tr>
            <tr>
              <td className={styles.colskill}>
                <Label className={styles.boldmargin15}>
                  Overall Technical Skills Rating
                </Label>
              </td>
              <td className={styles.colrating} colSpan={2}></td>
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
      </div>
    </div>
  );
};
export default TechnicalSkill;
