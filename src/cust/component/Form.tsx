import { css } from "@emotion/css";
import { Editor } from "@tinymce/tinymce-react";
import cogoToast from "cogo-toast";
import _ from "lodash";
import moment from "moment";
import React, { FC, memo, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Popover,
  Spinner,
} from "react-bootstrap";
import isEqual from "react-fast-compare";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

export interface IFielUploadResponse {
  success: boolean;
  msg: string;
  data: Data;
}

export interface Data {
  fileName: string;
}

const InfoIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="bi bi-info-circle"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
      <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  );
};

const CustomEditor: FC<{
  value: string | number;
  setFieldValue: (arg0: string, val: any) => void;
  name: string;
  isInvalid: boolean;
  md?: string;
  lg?: string;
}> = memo(({ isInvalid, name, setFieldValue, value, lg = "12", md = "12" }) => {
  const [isRun, setIsRun] = useState(false);
  const [initialValue, setInitialValue] = useState("");

  useEffect(() => {
    if (value) {
      if (isRun === false) {
        setInitialValue(_.toString(value));
        setIsRun(true);
      }
    }
  }, [value]);

  useEffect(() => {
    if (isInvalid === true) {
      cogoToast.error("Editor value is required");
    }
  }, [isInvalid]);

  const handleEditorChange = (e: string) => {
    setInitialValue(e);
    setFieldValue(name, e);
  };

  return (
    <>
      <Col
        // @ts-ignore
        md={md}
        // @ts-ignore
        lg={lg}
      >
        <Editor
          onEditorChange={handleEditorChange}
          value={initialValue}
          init={{
            valid_elements: "*[*]",
            height: 500,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount code",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | code",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Col>
    </>
  );
}, isEqual);

const CustomInput: FC<{
  label: string;
  value: string | number;
  name: string;
  isInvalid: boolean;
  err: string | undefined;
  md?: string;
  lg?: string;
  type?: string;
  placeholder: string;
  isTextArea?: boolean;
}> = memo(
  ({
    label,
    value,
    name,
    isInvalid,
    err,
    md = 4,
    lg = 4,
    placeholder,
    type = "text",
    isTextArea = false,
  }) => {
    return (
      <Form.Group as={Col} md={md} lg={lg} className="mt-1 mb-1">
        <Form.Label>
          {_.capitalize(label)}
          {false && <span style={{ color: "red" }}>*</span>}
        </Form.Label>
        <Form.Control
          type={type}
          name={name}
          value={
            type === "date"
              ? moment(
                  _.isNumber(_.toNumber(value)) && !_.isNaN(_.toNumber(value))
                    ? _.toNumber(value)
                    : value
                )
                  .format("YYYY-MM-DD")
                  .toString()
              : _.toString(value)
          }
          isInvalid={isInvalid}
          placeholder={_.capitalize(placeholder)}
          as={isTextArea ? "textarea" : "input"}
        />
        <Form.Control.Feedback type="invalid">
          {_.capitalize(err || "")}
        </Form.Control.Feedback>
      </Form.Group>
    );
  },
  isEqual
);

const CustomFileInput: FC<{
  label: string;
  value: string | number;
  name: string;
  isInvalid: boolean;
  err: string | undefined;
  md?: string;
  lg?: string;
  type?: string;
  placeholder: string;
  setFieldValue: (arg0: string, val: any) => void;
  isImage: boolean;
  isPdf?: boolean;
}> = memo(
  ({
    label,
    value,
    name,
    isInvalid,
    err,
    md = 4,
    lg = 4,
    placeholder,
    type = "file",
    setFieldValue,
    isImage,
    isPdf = false,
  }) => {
    const parsedUrl = new URL(process.env.REACT_APP_API_URL!);

    const [fileName, setFileName] = useState("");

    useEffect(() => {
      if (value) {
        setFileName(_.toString(value));
      }
    }, [value]);

    const handleFileChnage = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isImage === true) {
        if (
          e.target.files &&
          e.target.files.length !== 0 &&
          e.target.files[0].type.includes("image")
        ) {
          const fromData = new FormData();
          fromData.append("image", e.target.files[0]);

          await fetch(`${parsedUrl.origin}/upload`, {
            method: "POST",
            body: fromData,
            redirect: "follow",
          })
            .then(async (res) => {
              const data = (await res.json()) as IFielUploadResponse;

              setFieldValue(name, data.data.fileName);
            })
            .catch((err) => {
              setFieldValue(name, value);
            });
        } else {
          cogoToast.error("Please select valid file");
        }
      } else if (isPdf === true) {
        if (
          e.target.files &&
          e.target.files.length !== 0 &&
          e.target.files[0].type.includes("pdf")
        ) {
          const fromData = new FormData();
          fromData.append("image", e.target.files[0]);

          await fetch(`${parsedUrl.origin}/upload`, {
            method: "POST",
            body: fromData,
            redirect: "follow",
          })
            .then(async (res) => {
              const data = (await res.json()) as IFielUploadResponse;

              setFieldValue(name, data.data.fileName);
            })
            .catch((err) => {
              setFieldValue(name, value);
            });
        } else {
          cogoToast.error("Please select valid file");
        }
      } else {
        if (e.target.files && e.target.files.length !== 0) {
          const fromData = new FormData();
          fromData.append("image", e.target.files[0]);

          await fetch(`${parsedUrl.origin}/upload`, {
            method: "POST",
            body: fromData,
            redirect: "follow",
          })
            .then(async (res) => {
              const data = (await res.json()) as IFielUploadResponse;

              setFieldValue(name, data.data.fileName);
            })
            .catch((err) => {
              setFieldValue(name, value);
            });
        } else {
          cogoToast.error("Please select valid file");
        }
      }
    };

    return (
      <Form.Group as={Col} md={md} lg={lg} className="mt-1 mb-1">
        <Form.Label>
          {_.capitalize(label)} {"  "}{" "}
          {fileName && isImage && (
            <OverlayTrigger
              trigger="hover"
              placement="right"
              overlay={
                <Popover>
                  <Popover.Body>
                    <img
                      className="img-fluid"
                      width="240"
                      src={`${parsedUrl.origin}/upload/${fileName}`}
                    />
                  </Popover.Body>
                </Popover>
              }
            >
              <span
                className={css`
                  &:hover {
                    cursor: pointer;
                  }
                `}
              >
                <InfoIcon />
              </span>
            </OverlayTrigger>
          )}
          {fileName && isImage === false && (
            <span
              className={css`
                &:hover {
                  cursor: pointer;
                }
              `}
            >
              <a
                href={`${parsedUrl.origin}/upload/${fileName}`}
                target="_blank"
              >
                <InfoIcon />
              </a>
            </span>
          )}
          {false && <span style={{ color: "red" }}>*</span>}
        </Form.Label>
        <Form.Control
          type={type}
          isInvalid={isInvalid}
          placeholder={_.capitalize(placeholder)}
          onChange={handleFileChnage}
        />
        <Form.Control.Feedback type="invalid">
          {_.capitalize(err || "")}
        </Form.Control.Feedback>
      </Form.Group>
    );
  },
  isEqual
);

const CustomCheckBox: FC<{
  label: string;
  value: boolean;
  name: string;
  isInvalid: boolean;
  md?: string;
  lg?: string;
  setFieldValue: (arg0: string, val: any) => void;
}> = memo(
  ({ label, value, name, isInvalid, md = 4, lg = 4, setFieldValue }) => {
    const handleChange = () => {
      setFieldValue(name, !value);
    };

    return (
      <Form.Group as={Col} md={md} lg={lg} className="mt-1 mt-md-4">
        <Form.Check
          type="checkbox"
          label={_.capitalize(label)}
          onChange={handleChange}
          checked={value}
          isInvalid={isInvalid}
        />
      </Form.Group>
    );
  },
  isEqual
);

const CustomButton: FC<{
  label?: string;
  md?: string;
  lg?: string;
  isSubmitting: boolean;
}> = memo(({ label = "submit", md = 4, lg = 4, isSubmitting }) => {
  return (
    <Form.Group as={Col} md={md} lg={lg} className="mt-1">
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <Spinner
            animation="border"
            role="status"
            style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          ""
        )}
        {_.startCase(label)}
      </Button>
    </Form.Group>
  );
}, isEqual);

const CustomSelect: FC<{
  label: string;
  md?: string;
  lg?: string;
  err: string | undefined;
  value: string;
  name: string;
  isInvalid: boolean;
  options: { value: string | number; label: string | number }[];
  placeholder: string;
}> = memo(
  ({
    label,
    value,
    name,
    isInvalid,
    err,
    md = 4,
    lg = 4,
    placeholder,
    options,
  }) => {
    return (
      <Form.Group as={Col} md={md} lg={lg} className="mt-1">
        <Form.Label>
          {_.capitalize(label)}{" "}
          {false && <span style={{ color: "red" }}>*</span>}
        </Form.Label>
        <Form.Select
          name={name}
          value={_.toString(value)}
          isInvalid={isInvalid}
          placeholder={_.capitalize(placeholder)}
        >
          <option value={""}>select</option>
          {options.map((x) => {
            return (
              <option value={x.value}>
                {_.capitalize(_.toString(x.label))}
              </option>
            );
          })}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {_.capitalize(err || "")}
        </Form.Control.Feedback>
      </Form.Group>
    );
  },
  isEqual
);

const CustomMultiSelect: FC<{
  label: string;
  md?: string;
  lg?: string;
  err: string | string[] | undefined;
  value: string[];
  name: string;
  isInvalid: boolean;
  options: { value: string | number; label: string | number }[];
  setFieldValue: (arg0: string, val: any) => void;
}> = memo(
  ({ label, md, lg, err, value, name, isInvalid, options, setFieldValue }) => {
    const [custKey, setCustKey] = useState(Math.random().toString());
    const [defaultSelected, setDefaultSelected] = useState([]);

    useEffect(() => {
      if (Array.isArray(value) && value.length !== 0) {
        const newArr: { value: string | number; label: string | number }[] = [];

        value.map((xMain) => {
          options.map((xSub) => {
            if (_.toString(xSub.value) === _.toString(xMain)) {
              newArr.push(xSub);
            }
          });
        });

        //@ts-ignore
        setDefaultSelected(newArr);

        console.log("newArr", JSON.stringify(newArr));
      }
    }, [value]);

    const customStyles = {
      control: (base: any, state: { isFocused: any }) => ({
        ...base,
        // state.isFocused can display different borderColor if you need it
        borderColor: state.isFocused ? "#ddd" : !isInvalid ? "#ddd" : "#dc3545",
        // overwrittes hover style
        "&:hover": {
          borderColor: state.isFocused
            ? "#ddd"
            : !isInvalid
            ? "#ddd"
            : "#dc3545",
        },
      }),
    };

    const onChange = (
      value: { value: string | number; label: string | number }[]
    ): void => {
      let arr: string[] = [];

      // eslint-disable-next-line array-callback-return
      value.map((x) => arr.push(_.toString(x.value)));

      setFieldValue(name, arr);
      setCustKey(Math.random().toString());
    };

    return (
      <>
        <Form.Group as={Col} md={md} lg={lg} className="mt-1" key={custKey}>
          <Form.Label>{_.capitalize(label)}</Form.Label>

          <Select
            styles={customStyles}
            isMulti={true}
            name={name}
            // @ts-ignore
            options={options}
            // @ts-ignore
            onChange={onChange}
            value={defaultSelected}
          />

          <Form.Control.Feedback type="invalid">
            {_.capitalize(Array.isArray(err) ? err[0] : err || "")}
          </Form.Control.Feedback>
        </Form.Group>
      </>
    );
  },
  isEqual
);

const CustomCreatableMultiSelect: FC<{
  label: string;
  md?: string;
  lg?: string;
  err: string | string[] | undefined;
  value: string[];
  name: string;
  isInvalid: boolean;
  options: { value: string | number; label: string | number }[];
  setFieldValue: (arg0: string, val: any) => void;
}> = memo(
  ({ label, md, lg, err, value, name, isInvalid, options, setFieldValue }) => {
    const customStyles = {
      control: (base: any, state: { isFocused: any }) => ({
        ...base,
        // state.isFocused can display different borderColor if you need it
        borderColor: state.isFocused ? "#ddd" : !isInvalid ? "#ddd" : "#dc3545",
        // overwrittes hover style
        "&:hover": {
          borderColor: state.isFocused
            ? "#ddd"
            : !isInvalid
            ? "#ddd"
            : "#dc3545",
        },
      }),
    };

    const [isRunFirst, setIsRunFirst] = useState(false);

    const [currValue, setCurrentValue] = useState<typeof options>([]);

    useEffect(() => {
      if (isRunFirst === false && value) {
        const newArr: Array<{
          value: string | number;
          label: string | number;
        }> = [];

        let currValue = JSON.parse(_.toString(value));

        console.log("currValue", currValue);

        // @ts-ignore
        if (Array.isArray(currValue) && currValue.length !== 0) {
          currValue.map((item) => {
            newArr.push({ label: item, value: item });
          });

          setCurrentValue(newArr);
          setIsRunFirst(true);
        }
      }
    }, [value]);

    const handleChange = (
      val: Array<{
        value: string | number;
        label: string | number;
      }>
    ) => {
      setCurrentValue((item) => {
        setFieldValue(name, JSON.stringify([...val].map((item) => item.value)));

        return [...val];
      });
    };

    return (
      <>
        <Form.Group as={Col} md={md} lg={lg} className="mt-1">
          <Form.Label>{_.capitalize(label)}</Form.Label>

          <CreatableSelect
            styles={customStyles}
            isMulti={true}
            name={name}
            // @ts-ignore
            // options={options}
            // @ts-ignore
            onChange={handleChange}
            value={currValue}
          />

          <Form.Control.Feedback type="invalid">
            {_.capitalize(Array.isArray(err) ? err[0] : err || "")}
          </Form.Control.Feedback>
        </Form.Group>
      </>
    );
  },
  isEqual
);

export {
  CustomButton,
  CustomCheckBox,
  CustomCreatableMultiSelect,
  CustomEditor,
  CustomFileInput,
  CustomInput,
  CustomMultiSelect,
  CustomSelect,
};
