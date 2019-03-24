import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Button from "../components/Button";

Enzyme.configure({ adapter: new Adapter() });

describe("<Button />", () => {
  it("Correctly renders exactly one button", () => {
    const wrapper = shallow(<Button style={style} />);
    expect(wrapper.find("button")).to.have.lengthOf(1);
  });
  it("Text on button should equal to prop passed", () => {
    const wrapper = shallow(<Button style={style} name={"Test"} />);
    expect(wrapper.text()).to.equal("Test");
  });
});

const style = {
  btnL: "btn--dark--next",
  btnN: "btn--dark--last",
  btn: "btn--dark",
  link: "link link--dark",
  cards: "cards--dark",
  card: {
    div: "card--dark",
    question: "question--dark",
    answer: "answer--dark"
  }
};
