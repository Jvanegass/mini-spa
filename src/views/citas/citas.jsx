import React, { useState, useEffect } from 'react';
import { db } from '../../services/config';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const Citas = () => {
    // Estados para almacenar los datos del formulario, citas y mensajes de error
    const [patientName, setPatientName] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(''); // Estado para el mensaje de error

    // useEffect para obtener las citas en tiempo real (equivalente al endpoint GET)
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'appointments'), (snapshot) => {
            const appointmentsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAppointments(appointmentsData);
        });

        return unsubscribe;
    }, []);

    // Validación de los campos antes de enviar
    const validateForm = () => {
        if (patientName.trim().length < 2) {
            setError("El nombre del paciente debe tener al menos 2 caracteres.");
            return false;
        }
        if (!appointmentTime) {
            setError("Debe seleccionar una hora para la cita.");
            return false;
        }
        setError(''); // Si no hay errores, limpiar el mensaje de error
        return true;
    };

    // Función para manejar el envío del formulario y agregar una nueva cita
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la recarga de la página al enviar el formulario

        // Ejecutar validaciones antes de enviar
        if (!validateForm()) return;

        try {
            // Agrega un nuevo documento a la colección "appointments"
            await addDoc(collection(db, 'appointments'), {
                patientName,
                appointmentTime,
            });
            setPatientName('');
            setAppointmentTime('');
            alert("Cita registrada exitosamente");
        } catch (error) {
            console.error('Error al agregar la cita:', error);
            setError("Ocurrió un error al registrar la cita.");
        }
    };

    return (
        <div className='container'>
            <section className='form-container'>
                <h1>Registrar Cita Médica</h1>

                {/* Formulario para registrar una nueva cita */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre del paciente"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                    />
                    <input
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                    />
                    <button type="submit">Registrar Cita</button>
                </form>

                {/* Mostrar mensaje de error si existe */}
                {error && <p className="error-message">{error}</p>}
            </section>

            <section className='list-container'>
                <h2>Lista de Citas</h2>
                {/* Muestra la lista de citas en tiempo real */}
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            {appointment.patientName} - {appointment.appointmentTime}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Citas;
