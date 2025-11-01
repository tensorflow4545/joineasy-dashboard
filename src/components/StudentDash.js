"use client"

import { useState,useEffect } from "react";
import Navbar from "@/components/Navbar";
import { CheckCircle, Clock } from "lucide-react";
import { clearUser, getAssignments, getSubmissions, saveSubmissions } from "@/lib/storage";
import ConfirmDialog from "./confimDialog";
export default function StudentDash({user,onLogout}){
   const [assignments,setAssignment]=useState([]);
   const [submissions,setSubmission]=useState({});
   const [showConfirmDialog,setShowConfirmDialog]=useState(null);

   useEffect(()=>{
    setAssignment(getAssignments());
    setSubmission(getSubmissions());
   },[]);

   const handleLogout=()=>{
    clearUser();
    onLogout();
   }

   const handleSubmit=(AssignmentId)=>{
     setShowConfirmDialog(AssignmentId);
   }

    const confirmSubmission = () => {
     const key = `${user.id}-${showConfirmDialog}`
     const newSubmissions = {
       ...submissions,
       [key]: { submitted: true, timestamp: new Date().toISOString() },
     }
     setSubmission(newSubmissions)
     saveSubmissions(newSubmissions)
     setShowConfirmDialog(null)
   }
 
   const getSubmissionStatus = (assignmentId) => {
     const key = `${user.id}-${assignmentId}`
     return submissions[key]?.submitted || false
   }

   const calculateProgress=()=>{
     const submitted=assignments.filter((a)=>
        getSubmissionStatus(a.id)
     ).length
     return assignments.length>0 ? (submitted/assignments.length)*100:0;
   }

   return(
    <>
        <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Overall Progress
            </h2>
            <span className="text-2xl font-bold text-indigo-600">
              {Math.round(calculateProgress())}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {assignments.filter((a) => getSubmissionStatus(a.id)).length} of{' '}
            {assignments.length} assignments completed
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => {
            const isSubmitted = getSubmissionStatus(assignment.id)
            return (
              <div
                key={assignment.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {assignment.title}
                  </h3>
                  {isSubmitted ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <Clock className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {assignment.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Due Date:</span>
                    <span className="font-medium text-gray-700">
                      {assignment.dueDate}
                    </span>
                  </div>
                  <a
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 text-sm underline block"
                  >
                    View Instructions
                  </a>
                </div>
                {isSubmitted ? (
                  <div className="bg-green-50 text-green-700 py-2 px-4 rounded-lg text-sm font-medium text-center">
                    Submitted ✓
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubmit(assignment.id)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition"
                  >
                    Submit Assignment
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {showConfirmDialog && (
        <ConfirmDialog
          onConfirm={confirmSubmission}
          onCancel={() => setShowConfirmDialog(null)}
        />
      )}
    </div>
    </>
   )
}