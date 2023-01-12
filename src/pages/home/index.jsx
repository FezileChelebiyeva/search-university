import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, inputValue } from "../../redux/slice/getData";
import { Table } from "antd";
import { Spin } from "antd";

const HomePage = () => {
  const dispatch = useDispatch();
  const university = useSelector((state) => state.university);
  useEffect(() => {
    dispatch(fetchData(""));
  }, []);

  const columns = [
    {
      title: "University Name",
      dataIndex: "name",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Domains",
      dataIndex: "domains",
    },
    {
      title: "Website",
      dataIndex: "web_pages",
      render: (website) => (
        <a target="_blank" href={website}>
          {website}
        </a>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Search University By Name</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Input
          onChange={(e) => {
            dispatch(inputValue(e.target.value));
          }}
          style={{ width: "600px", borderRadius: "0" }}
          placeholder="university name"
        />
        <Space direction="vertical">
          <Space wrap>
            <Button
              style={{ borderRadius: "0" }}
              onClick={() => dispatch(fetchData(university.inputValue))}
              type="primary"
              loading={university.loading}
            >
              Search
            </Button>
          </Space>
        </Space>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "40px" }}>
        {university.loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "40vh",
              alignItems: "center",
            }}
          >
            <Space size="middle">
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </Space>
          </div>
        )}
        {university.loading ? (
          university.loading
        ) : (
          <Table
            dataSource={university.data}
            columns={columns}
            rowKey="domains"
          />
        )}

        {university.error && university.error}
      </div>
    </div>
  );
};

export default HomePage;
