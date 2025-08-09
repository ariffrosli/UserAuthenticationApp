import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthContext';
import { Eye, EyeClosed } from 'lucide-react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, storedName } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (!email.trim() || !password) {
            alert('Email and password are required');
            return;
        }
        login(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome {storedName ? storedName : ''}!</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <Eye size={24} color="#333" />
                    ) : (
                        <EyeClosed size={24} color="#333" />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <Button title="Login" onPress={handleLogin} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        marginBottom: 12,
    },
    link: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 12,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        marginBottom: 16,
    },

    passwordInput: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    }
});