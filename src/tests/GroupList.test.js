import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GroupList from "../components/GroupList";

Enzyme.configure({ adapter: new Adapter() });

describe("<GroupList />", () => {
  it("Mount GroupList successfully", () => {
    const wrapper = shallow(<GroupList />);
    expect(wrapper.find("div").exists()).to.equal(true);
  });
});
