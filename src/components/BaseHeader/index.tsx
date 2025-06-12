import { DatePicker, DatePickerProps } from "antd";
import styles from "./index.module.less";
import BaseButton from "../BaseButton";
import { useState } from "react";
import { RangePickerProps } from "antd/es/date-picker";

export type BaseHeaderProps = {
  columns?: {
    //字段名字
    title: string;
    // 搜索条件
    item: JSX.Element;
  }[];
  getPage?: (current: number, pageSize: number, searchFrom: Query[]) => void;
  handelAdd?: () => void;
  handleDelBatCh?: () => void;
  setSearchFrom?: (searchFrom: Query[]) => void;
  searchFrom:  Query[];
};

const BaseHeader = (props: BaseHeaderProps) => {
  const { columns,handelAdd,handleDelBatCh,getPage,searchFrom,setSearchFrom } = props;


  const onOkCreateDate = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    if (Array.isArray(value)) {
      setSearchFrom?.([...searchFrom,
        {
          key: "create_time",
          sqlKeyword: "BETWEEN",
          value:
            value && value[0] && value[1]
              ? [
                  value[0].format("YYYY-MM-DD HH:mm:ss"),
                  value[1].format("YYYY-MM-DD HH:mm:ss"),
                ]
              : [],
        },
      ]);
    }
  };

  const onOkUpdateDate = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    if (Array.isArray(value)) {
      setSearchFrom?.([...searchFrom,
        {
          key: "update_time",
          sqlKeyword: "BETWEEN",
          value:
            value && value[0] && value[1]
              ? [
                  value[0].format("YYYY-MM-DD HH:mm:ss"),
                  value[1].format("YYYY-MM-DD HH:mm:ss"),
                ]
              : [],
        },
      ]);
    }
  };
  return (
    <>
      {/* 头部--一些操作，添加，批量删除，搜索 */}
      <div className={styles.header}>
        {/* 搜索模块 */}
        <div className={styles.headerSearch}>
          {/* 搜索条件 */}
          <div className={styles.searchCondition}>
            {/* 名字模糊搜索 */}
            {columns?.map((item, index) => {
              return (
                <div className={styles.searchItem} key={index}>
                  <span>{item.title}：</span>
                  {item.item}
                </div>
              );
            })}
          </div>
          {/* 修改时间和创建时间搜索 */}
          <div className={styles.searchDate}>
            <span>创建时间：</span>
            <DatePicker.RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={onOkCreateDate}
            />
          </div>
          <div className={styles.searchDate}>
            <span>修改时间：</span>
            <DatePicker.RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={onOkUpdateDate}
            />
          </div>
        </div>
        {/* 头部操作模块，添加，重置 */}
        <div className={styles.headerBtn}>
          <div>
            <BaseButton onClick={() => handelAdd?.()} type={"add"}>
              添加
            </BaseButton>
            <BaseButton onClick={()=>handleDelBatCh?.()} type={"delete"}>
              删除
            </BaseButton>
          </div>
          <div>
            <BaseButton
              onClick={() => getPage?.(1, 10, searchFrom)}
              type={"search"}
            >
              搜索
            </BaseButton>

            <BaseButton
              onClick={() => {
                setSearchFrom?.([]);
                getPage?.(1, 10, []);
              }}
              type={"reset"}
            >
              重置
            </BaseButton>
          </div>
        </div>
      </div>
    </>
  );
};



export default BaseHeader;