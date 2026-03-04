type Props = {
    head: any;
    removeStudent: (student: any) => void;
};

function StudentList({ head, removeStudent }: Props) {

    let current = head;

    const elements = [];

    while (current !== null) {

        const studentData = current.value; 

        elements.push(

            <div key={studentData.codigo}>

              <p>Nombre: {studentData.nombre}</p>
              <p>Edad: {studentData.edad}</p>
              <p>Código: {studentData.codigo}</p>

              <button onClick={() => removeStudent(studentData)}>
                Eliminar
              </button>

              <hr />
            </div>
        );

        current = current.next;
    }

      return (
            <div>
                <h2>Estudiantes:</h2>
                {elements}
            </div>
      );
}

export default StudentList;