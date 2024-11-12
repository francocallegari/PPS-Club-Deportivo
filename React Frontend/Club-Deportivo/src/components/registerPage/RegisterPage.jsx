import React, { useState, useEffect, useRef } from 'react'
import RegisterForm from '../login/Register'
import { ProgressBar, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
import RegisterPaymentStep from '../registerPaymentStep/RegisterPaymentStep'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import './RegisterPage.css'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    const [messageAlert, setMessageAlert] = useState("")
    const hasRegistered = useRef(false)

    useEffect(() => {
        // Captura los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');

        // Verifica si el estado es aprobado
        if (status){
            if (status === 'approved' && !hasRegistered.current) {
                console.log("aprobado")
                setStep(2)
                setProgress(50)
                registerNewMember()
                hasRegistered.current = true
    
            } else {
                setStep(2)
                setProgress(50)
                setMessageAlert("No se pudo completar el pago. Vuelva a intentarlo")
            }
        }
         
    }, [hasRegistered])

    const goToNextStep = (data) => {
        if (step === 1) {
            setStep(2)
            setProgress(50)
            localStorage.setItem("UserData", JSON.stringify(data))
        }
    }

    const goToPreviousStep = () => {
        if (step === 2) {
            setStep(1)
            setProgress(0)
            localStorage.removeItem("UserData")
            history.replaceState(null, '', '/register')
            setMessageAlert("")
        }
    }

    const registerNewMember = async () => {
        const userData = JSON.parse(localStorage.getItem("UserData"))

        try {
            const response = await fetch("https://localhost:7081/api/User/registerUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Usuario creado con éxito:", data)
                localStorage.removeItem("UserData")
                setProgress(100)
                setStep(3)
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            } else {
                console.error("Error al registrar usuario");
                setMessageAlert("Error al registrar usuario")
            }
        } catch (error) {
            console.error("Error de red o en la conexión:", error);
            setMessageAlert("Error al registrar usuario. Por favor, inténtelo más tarde.")
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {step == 1 && <RegisterForm checkForm={goToNextStep} alertMessage={messageAlert}></RegisterForm>}

            {step == 2 && (
                <div style={{ width: '1000px', marginBottom: '30px' }}>
                    <RegisterPaymentStep alertMessage={messageAlert}></RegisterPaymentStep>
                    <button className='flex items-center previous-button' onClick={goToPreviousStep}>
                        <FaArrowLeft className='ml-2'></FaArrowLeft>
                        Anterior
                    </button>
                </div>
            )}

            {step == 3 && (
                <div className='stepThreeDiv'>
                    <Alert variant='success'>¡Registro exitoso!</Alert>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <p>Redirigiendo a Inicio de Sesión</p>
                        <Spinner animation="border" variant="secondary"></Spinner>
                    </div>

                </div>
            )}

            <div className="progressBar mb-5" style={{ width: "700px" }}>
                <ProgressBar now={progress}></ProgressBar>
            </div>
        </div>
    )
}

export default RegisterPage