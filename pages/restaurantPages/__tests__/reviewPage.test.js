import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import reviewPage from "../reviewPage";
import {createStore} from 'redux';
import {SafeAreaProvider} from "react-native-safe-area-context";
import reducer from "../../../reducer";
import {Provider} from "react-redux";

// snapshot test
test('renders correctly', () => {
    const store = createStore(reducer);
    const tree = renderer.create(
        <Provider store={store}>
            <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                <reviewPage
                    navigation={{navigate: jest.fn()}}
                    route={{params: {}}}
                />
            </SafeAreaProvider>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });