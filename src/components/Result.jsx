import React from "react";

// components
import "./Common.css";

export const Result = ({ plans, planCount, error }) => {
  if (error) {
    return (
      <div className="wrapper">
        <div className="ui negative message">
          <div className="header">エラーが発生しました</div>
          検索条件を見直すか、管理者にお問い合わせください
        </div>
      </div>
    );
  }

  if (!plans) return <></>;

  if (planCount === 0) {
    return (
      <div className="wrapper">
        <div className="ui orange message">
          <div className="header">ゴルフ場が見つかりませんでした。</div>
        </div>
      </div>
    );
  }

  const results = plans.map((plan) => {
    return (
      <div className="item" key={plan.plan_id}>
        <div className="image">
          <img src={plan.image_url} alt={plan.course_name} />
        </div>
        <div className="content">
          <div className="meta">
            <span className="cinema">{plan.course_name}</span>
            <div className="ui mini statistics">
              <div className="statistic">
                <div className="value">
                  <i className="car icon"></i>
                  {plan.duration + "分"}
                </div>
              </div>
              <div className="statistic">
                <div className="value">
                  <i className="yen sign icon"></i>
                  {plan.price.toLocaleString()}
                </div>
              </div>
              <div className="statistic">
                <div className="value">
                  <i className="thumbs up outline icon"></i>
                  {plan.evaluation}
                </div>
              </div>
            </div>
            <div className="ui star rating" data-rating="3"></div>
            <div className="extra">
              <div className="ui label">{plan.prefecture}</div>
              <div className="ui label">{plan.plan_name}</div>
            </div>
          </div>
          <div className="description">
            <p>{plan.caption}</p>
          </div>
          <div className="item-button">
            <a
              href={plan.reserve_url_pc}
              target="_blank"
              rel="noopener noreferrer"
            >
              　コースの予約はこちら
            </a>
          </div>
        </div>
      </div>
    );
  });

  return <>{results}</>;
};