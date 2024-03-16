import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const getEmpoyeeData = async (employeeIndex: string) => {
  const res = await fetch(
    "https://randomuser.me/api/?results=10&seed=abc&inc=age,dob,email,location,name,phone,picture"
  );
  const employees = await res.json();
  return employees.results[employeeIndex];
};

type Location = {
  city: string;
  country: string;
  postcode: string;
  state: string;
  street: {
    name: string;
    number: string;
  };
};

function convertToHumanReadable(timestampStr) {
  // Parse the input timestamp string
  const timestamp = new Date(timestampStr);

  // Convert to a human-readable format (adjust timezone as needed)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };

  const humanReadableTime = timestamp.toLocaleString("en-US", options);
  return humanReadableTime;
}

function getAddress({ city, country, postcode, state, street }: Location) {
  const streetAddress = `${street.number} ${street.name}`;

  return `
    ${streetAddress}, ${city}, ${state} ${postcode} ${country}`;
}

const Employee = async ({ params }: { params: { id: string } }) => {
  const employeeIndex = params.id;
  const employeeData = await getEmpoyeeData(employeeIndex);
  return (
    <div className="bg-slate-900 h-screen p-6 text-white text-xl">
      <Link
        className="bg-slate-800 rounded-lg text-white hover:bg-slate-700 flex w-fit p-2"
        href="/"
      >
        <ArrowLeftIcon className="h-8 w-8" />
      </Link>
      <h1 className="text-4xl py-8">{`${employeeData.name.last}, ${employeeData.name.first}`}</h1>
      <div className="flex px-8">
        <img
          className="rounded-full w-32 h-32 mb-8"
          src={employeeData.picture.large}
        />
        <div className="border-l-2 ml-8 pl-8">
          <div className="py-2">
            <span className="text-slate-500 mr-4">Age</span>
            <span>{employeeData.dob.age}</span>
          </div>
          <div className="py-2">
            <span className="text-slate-500 mr-4">Full Address </span>
            <span>{getAddress(employeeData.location)}</span>
          </div>
          <div className="py-2">
            <span className="text-slate-500 mr-4">Email Address </span>
            <span>{employeeData.email}</span>
          </div>
          <div className="py-2">
            <span className="text-slate-500 mr-4">Date of Birth </span>
            <span>{convertToHumanReadable(employeeData.dob.date)}</span>
          </div>
          <div className="py-2">
            <span className="text-slate-500 mr-4">Phone number </span>
            <span>{employeeData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
