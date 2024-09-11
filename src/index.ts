interface Student {
  name: string;
  age: number;
  scores: {
    korean: number;
    math: number;
    society: number;
    science: number;
    english: number;
  };
}

function assignGrade(average: number): string {
  if (average >= 90) {
    return "A";
  } else if (average >= 80) {
    return "B";
  } else if (average >= 70) {
    return "C";
  } else if (average >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function calculateAverage(student: Student): number {
  const { scores } = student;
  const sumScroes =
    scores.korean +
    scores.math +
    scores.society +
    scores.science +
    scores.english;

  const average = sumScroes / Object.keys(student.scores).length;
  return average;
}

function createStudent(
  name: string,
  age: number,
  korean: number,
  math: number,
  society: number,
  science: number,
  english: number
): Student {
  return {
    name,
    age,
    scores: {
      korean,
      math,
      society,
      science,
      english,
    },
  };
}

function printResult(student: Student): void {
  const average = calculateAverage(student);
  const grade = assignGrade(average);
  console.log(
    `${student.name} (${student.age}세) - 평균: ${average.toFixed(
      2
    )}, 학점: ${grade}`
  );
}

function main(): void {
  const spartan = createStudent("Spartan", 30, 95, 89, 76, 90, 97);
  printResult(spartan);
}

main();
