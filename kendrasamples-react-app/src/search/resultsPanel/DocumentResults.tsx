import React from "react";
import Kendra from "aws-sdk/clients/kendra";

import { isNullOrUndefined, selectMostRecentUpdatedTimestamp } from "../utils";

import ResultTitle from "./components/ResultTitle";
import ResultText from "./components/ResultText";
import ResultFooter from "./components/ResultFooter";
import "../search.scss";
import { Relevance } from "../constants";

interface DocumentResultsProps {
  results: Kendra.QueryResultItemList;

  submitFeedback: (
    relevance: Relevance,
    resultItem: Kendra.QueryResultItem
  ) => Promise<void>;
}

export default class DocumentResults extends React.Component<
  DocumentResultsProps,
  {}
> {
  // All results in this component has QueryResultType === "ANSWER"
  private renderResults = (result: Kendra.QueryResultItem) => {
    const { submitFeedback } = this.props;

    let attributes = Object();
    if (!isNullOrUndefined(result.DocumentAttributes)) {
      result.DocumentAttributes!.forEach(attribute => {
        attributes[attribute.Key] = attribute.Value;
      });
    }

    const lastUpdated = selectMostRecentUpdatedTimestamp(attributes);

    return (
      <div className="container-body" key={result.Id}>
        <ResultTitle
          queryResultItem={result}
          attributes={attributes}
          submitFeedback={submitFeedback}
        />
        <ResultText
          className="small-margin-bottom"
          text={result.DocumentExcerpt!}
          lastUpdated={lastUpdated}
        />
        <ResultFooter
          queryResultItem={result}
          attributes={attributes}
          submitFeedback={submitFeedback}
        />
      </div>
    );
  };

  render() {
    const { results } = this.props;

    if (isNullOrUndefined(results) || results.length === 0) {
      return null;
    }

    return (
      <div className="document-results-section">
        {results.map(this.renderResults)}
      </div>
    );
  }
}
