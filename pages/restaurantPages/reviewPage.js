import React, {useState, useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    BackHandler,
    Dimensions,
    FlatList
} from "react-native";
import BackButton from "../../component/BackButton";
import {
    getReviewsForRestaurant,
} from "../../helpers/apiHelpers";
import Loading from "../../component/Loading";
import {connect} from "react-redux";
import {mapReduxStateToProps} from "../../helpers/reduxHelpers";
import Review from "../../component/Review";
import Tag from "../../component/Tag"
import {useSafeArea} from "react-native-safe-area-context";

function ReviewPage(props) {
    const { navigation, route, user } = props;
    const [isLoading, setLoading] = useState(true);
    const [dishes, setDishes] = useState([]);
    const [data, setReviews] = useState([]);
    const [refreshingReviews, setRefreshingReviews] = useState(false);
    const {restaurant_id} = route.params;
    const {isLoggedIn} = user;

    useEffect(() => {
        Promise.all([
            getReviewsForRestaurant(restaurant_id).then(data => setReviews(data)),
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const onReviewRefresh = () => {
        setRefreshingReviews(true);
        getReviewsForRestaurant(restaurant_id)
            .then(data => setReviews(data))
            .then(() => setRefreshingReviews(false));
    }

    const renderFooter = () => {
        return (
            data.length > 0 &&
            //(isLastPage
             //   ? 
                    <Text style={styles.footer}>No More Reviews</Text>
                //: isFetching && <Text style={styles.footer}>Loading...</Text>)
        )
    }

    const insets = useSafeArea();

    return (
        isLoading
            ? <Loading/>
            : <View style = {[
                styles.container,
                {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
                ]}>
                <View style={{ width: "100%", flex: 1}} >
                    <View style={styles.header}>
                        <BackButton white={false} style = {{margin: '2%'}} onPress = {() => navigation.goBack()} />
                        <Text style={styles.headerText}>Reviews</Text>
                        {isLoggedIn && <Tag style={{margin: '3%'}} name="+" onPress={() => navigation.navigate('Add Review', {restaurant_id})}/>}
                    </View>

                    <FlatList
                        style = {styles.scroll}
                        data={data}
                        extraData={data}
                        renderItem={({ item }) =>
                            <Review 
                                key={item.id}
                                user_id={item.relationships.user.data.id}
                                date={new Date(item.attributes.created_at).toLocaleDateString()}
                                title={item.attributes.title}
                                rating={item.attributes.rating}
                                content={item.attributes.content}
                            />}
                        keyExtractor={review => review.id}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={() => <Text style={styles.footer}>No Reviews Found</Text>}
                        onRefresh={onReviewRefresh}
                        refreshing={refreshingReviews}
                    />
                </View>
            </View>
    );
}

export default connect(mapReduxStateToProps)(ReviewPage)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: "100%",
        height: Dimensions.get('window').height * 0.08,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 'auto',
    },
    title: {
        fontSize: 22,
        marginLeft: '2%',
        fontFamily: 'Ubuntu-Bold',
        marginBottom: '2%',
        color: '#404040'
    },
    section: {
        flex: 1,
    },
    scroll: {
        width: '100%',
    },
    footer: {
        color: '#ff6961',
        fontSize: 16,
        marginTop: '2%',
        fontFamily: 'Ubuntu-Bold',
        alignSelf: 'center'
    },
})
