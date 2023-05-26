import * as React from "react";
import styles from "./NonBillingReviewsForm.module.scss";
import { INonBillingReviewsFormProps } from "./INonBillingReviewsFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import MainComponent from "./MainComponent";

export default class NonBillingReviewsForm extends React.Component<
  INonBillingReviewsFormProps,
  {}
> {
  constructor(prop: INonBillingReviewsFormProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }

  public render(): React.ReactElement<INonBillingReviewsFormProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <MainComponent sp={sp} context={this.props.context} />;
  }
}
