import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProfilePage from "../components/ProfilePage";

Enzyme.configure({ adapter: new Adapter() });

describe("<ProfilePage />", () => {
  it("Do not render anything if logged is false", () => {
    const wrapper = shallow(<ProfilePage logged={false} />);
    expect(wrapper.find("div").exists()).to.equal(false);
  });
  it("Correctly renders 3 buttons with classname link", () => {
    const wrapper = shallow(<ProfilePage style={style} logged={true} />);
    expect(wrapper.find("button.link")).to.have.lengthOf(3);
  });
  it("Only 1 button is active at a time", () => {
    const wrapper = shallow(<ProfilePage style={style} logged={true} />);
    expect(wrapper.find(".active-link")).to.have.lengthOf(1);
  });
  it("Default view overview page (number : 1)", () => {
    const wrapper = shallow(<ProfilePage style={style} logged={true} />);
    expect(wrapper.state("viewing")).to.equal(1);
  });
  it("Click on groups button changes the viewing state to 2", () => {
    const wrapper = shallow(<ProfilePage style={style} logged={true} />);
    wrapper
      .find("button.link")
      .at(1)
      .simulate("click");
    expect(wrapper.state("viewing")).to.equal(2);
  });
  it("Click on Questions button changes the viewing state to 3", () => {
    const wrapper = shallow(<ProfilePage style={style} logged={true} />);
    wrapper
      .find("button.link")
      .at(2)
      .simulate("click");
    expect(wrapper.state("viewing")).to.equal(3);
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
