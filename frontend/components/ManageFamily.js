import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Alert } from "react-native";
import styles from "../stylesheet";
import { Text, ListItem } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useAuth } from "../providers/AuthProvider";

export function ManageFamily({navigation, route}) {
  const { user } = useAuth();
  const [newTeamMember, setNewTeamMember] = useState(null);
  const [teamMemberList, setTeamMemberList] = useState([]);


  const requestUser = async () => {
    if (user != null) {
      try {
        await user.functions.requestUser(user.id, newTeamMember);
        Alert.alert("User has been requested!")
      } catch (err) {
        Alert.alert("An error occured", err.message)
      }
      setNewTeamMember("")
    }
  };
  // getTeam calls the backend function getMyTeamMembers to retrieve theclea
  // team members of the logged in user's project
  const getTeam = async () => {
    if (user != null) {
      try {
        const teamMembers = await user.functions.getMyTeamMembers([]);
        setTeamMemberList(teamMembers);
      } catch (err) {
        Alert.alert("An error occurred while getting team members", err);
      }
    }
  };


  // removeTeamMember calls the backend function removeTeamMember to remove a
  // team member from the logged in user's project
  const removeTeamMember = async (email) => {
    try {
      await user.functions.removeMemberFromCurrent(email);
      await user.functions.removeCurrentFromUser(email, user.id);
      getTeam();
    } catch (err) {
      console.log(err);
    }
  };

  const openDeleteDialogue = (member) => {
    Alert.alert(
      "Remove the following member from your household?",
      member.name,
      [
        {
          text: "Remove",
          onPress: () => {
            removeTeamMember(member.name);
          },
        },
        { text: "cancel", style: "cancel" },
      ]
    );
  };

  // Load the team when the component is first mounted or when the user changes.
  useEffect(() => {
    getTeam();
  }, [teamMemberList]);

  return (
    <View style={styles.manageFamilyWrapper}>
      {teamMemberList.map((member) => (
        <ListItem
          onPress={() => openDeleteDialogue(member)}
          bottomDivider
          key={member.name}
        >
          <ListItem.Content>
            <ListItem.Title >
              {member.name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setNewTeamMember(text)}
          value={newTeamMember}
          placeholder="Household member username"
          style={styles.addTeamMemberInput}
          autoCapitalize="none"
        />
      </View>
      <View
        style={{
          alignContent: "center",
          alignSelf: "center",
          borderRadius: 35,
          alignItems: "center",
          elevation: 0,
          backgroundColor: "#fcfcfc",
          ...styles.navBarShadow,
        }}
      >
        <TouchableHighlight
          onPress={() => requestUser()}
          style={{
            width: 300,
            height: 60,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 35,
            backgroundColor: "royalblue",
          }}
          underlayColor={3}
        >
          <View>
            <Text style={{ fontSize: 24, color: "white" }}>
              Invite User
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* <Button
        onPress={() => addTeamMember(newTeamMember)}
        title="Add Family Member"
      /> */}
    </View>
  );
}