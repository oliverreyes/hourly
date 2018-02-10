import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Footer from '../Components/Footer';


class TaskListView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Tasks</Text>
        <FlatList
          data={[
            {key: 'Wash Car'},
            {key: 'Get Haircut'},
            {key: 'Deposit $ at bank'},
            {key: 'Get some Headspace'},
            {key: 'Go to gym'},
            {key: 'Buy groceries'},
            {key: 'Pay off card'},
            {key: 'Watch boxing vids'},
          ]}
          renderItem={({item}) =>
            <View style={styles.list_box}>
              <Text style={styles.list_text}>{item.key}</Text>
            </View>}

        />

        <Footer />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'powderblue',
    alignSelf: 'stretch'
  },
  list_box: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    alignSelf: 'stretch',
    paddingVertical: 5
  },
  list_text: {
    fontSize: 60,
    textAlign: 'right',
    alignSelf: 'stretch',
    overflow: 'scroll'
  }
});


export default TaskListView;
