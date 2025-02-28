import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, ActivityIndicator 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Chatbot icon
import axios from "axios";

const FinanceScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! How can I assist you with finance?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle user messages
  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { id: `${Date.now()}`, text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    let botResponse = "I'm not sure about that. Try asking about fees, scholarships, or payment options.";
    
    if (input.toLowerCase().includes("fees")) {
      botResponse = "Tuition fees can be checked on the university portal.";
    } else if (input.toLowerCase().includes("scholarship")) {
      botResponse = "Scholarships are available based on merit and need. Check the finance office.";
    } else if (input.toLowerCase().includes("payment")) {
      botResponse = "You can make payments through online banking, UPI, or at the finance office.";
    } else if (input.toLowerCase().includes("check token")) {
      botResponse = await checkToken(); // API Call for Token Verification
    }

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { id: `${Date.now()}-bot`, text: botResponse, sender: "bot" }]);
    }, 1000);

    setInput(""); // Clear input field
  };

  // API Function to Verify Cloudflare Token
  const checkToken = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.cloudflare.com/client/v4/user/tokens/verify", {
        headers: {
          "Authorization": "Bearer lLJ9Du1bSWyeQo1oYgOunh2FVf7Vr7BP8jJiOQhR",
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        return `✅ Token Status: ${response.data.result.status}`;
      } else {
        return "❌ Invalid Token.";
      }
    } catch (error) {
      return "⚠️ Error verifying token.";
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Finance Screen - Coming Soon!</Text>

      {/* Floating Chatbot Button */}
      <TouchableOpacity style={styles.chatbotButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="chat" size={28} color="white" />
      </TouchableOpacity>

      {/* Chatbot Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.chatBox}>
            {/* Header */}
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>Finance Chatbot</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Messages */}
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.messageBubble, item.sender === "user" ? styles.userMessage : styles.botMessage]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
              contentContainerStyle={styles.chatContent}
            />

            {/* Loader when Checking Token */}
            {loading && <ActivityIndicator size="small" color="#F58220" style={styles.loader} />}

            {/* Input Box */}
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Ask about finance or type 'check token'..." 
                placeholderTextColor="#aaa" 
                value={input} 
                onChangeText={setInput} 
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <MaterialIcons name="send" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ============================ STYLES ============================

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { fontSize: 22, fontWeight: "bold", color: "white" },

  chatbotButton: { 
    position: "absolute", bottom: 30, right: 30, backgroundColor: "#F58220", 
    padding: 15, borderRadius: 30, alignItems: "center", justifyContent: "center", elevation: 5 
  },

  modalContainer: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  chatBox: { backgroundColor: "#1E1E1E", height: "50%", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 15 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  chatTitle: { fontSize: 18, fontWeight: "bold", color: "white" },

  chatContent: { paddingBottom: 15 },
  messageBubble: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: "80%" },
  userMessage: { backgroundColor: "#F58220", alignSelf: "flex-end" },
  botMessage: { backgroundColor: "#333", alignSelf: "flex-start" },
  messageText: { color: "white", fontSize: 16 },

  loader: { marginBottom: 10 },

  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#1E1E1E", padding: 10, borderRadius: 10 },
  input: { flex: 1, color: "white", fontSize: 16 },
  sendButton: { padding: 5, marginLeft: 10 },
});

export default FinanceScreen;
