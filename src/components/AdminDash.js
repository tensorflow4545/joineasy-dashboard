"use client"

import { useState,useEffect } from "react";
import Navbar from "./Navbar";
import { getAssignments,saveAssignments,getSubmissions,saveSubmissions,clearUser } from "@/lib/storage";
import { CheckCircle, Clock, User, Trash2 } from 'lucide-react';
import {USERS} from "@/lib/mockData"
export default function AdminDash({user,onLogout}){
   const [assignments,setAssignments]=useState([]);
   const [submissions,setSubmissions]=useState({});
   const [showAddAssignment,setShowAddAssignment]=useState(false);
   const [newAssignment,setNewAssignment]=useState({
     title: '',
     description: '',
     dueDate:'',
     driveLink:''
   });

   useEffect(()=>{
     setAssignments(getAssignments());
     setSubmissions(getSubmissions());
   },[]);

   const handleLogout=()=>{
     clearUser();
     onLogout();
   };

   const handleAddAssignment=()=>{
    if(!newAssignment.title||!newAssignment.description||!newAssignment.dueDate||!newAssignment.driveLink){
        alert("Pease fill all the field");
        return;
    }
    const assignment={
        id:Date.now().toString(),
        ...newAssignment,
        createdBy:user.id
    }

    const updateAssignments = [...assignments,assignment]
    setAssignments(updateAssignments);
    saveAssignments(updateAssignments);
    setNewAssignment({title:'',description:'',dueDate:'',driveLink:''})
    setShowAddAssignment(false);
   };

   const handeDeleteAssignment=(id)=>{
      const updateAssignments=assignments.filter((a)=>a.id!==id);
      setAssignments(updateAssignments);
      saveAssignments(updateAssignments);

      const newSubmissions={...submissions};
      Object.keys(newSubmissions).forEach((key)=>{
        if(key.endsWith(`-${id}`)){
            delete newSubmissions[key];
        }
      })
      setSubmissions(newSubmissions);
      saveSubmissions(newSubmissions);
   };

   const getSubmissionStatus=(assignmentId,studentId)=>{
    const key = `${studentId}-${assignmentId}`;
    return submissions[key]?.submitted || false;
   }

   const getStudentProgress=(assignmentId)=>{
     const students=USERS.filter((u)=>u.role==='student');
     const submitted=students.filter((s)=>getSubmissionStatus(assignmentId,s.id)).length;
     return students.length>0 ?(submitted/students.length)*100:0;
   }

   return (
    <>
        <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onAddAssignment={() => setShowAddAssignment(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">
                    {assignment.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{assignment.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                    <span>Due: {assignment.dueDate}</span>
                    <a
                      href={assignment.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 underline"
                    >
                      Drive Link
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handeDeleteAssignment(assignment.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    Submission Progress
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    {Math.round(getStudentProgress(assignment.id))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getStudentProgress(assignment.id)}%` }}
                  />
                </div>

                <div className="grid gap-2 mt-4">
                  {USERS.filter((u) => u.role === 'student').map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-700">
                          {student.name}
                        </span>
                      </div>
                      {getSubmissionStatus(assignment.id, student.id) ? (
                        <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Submitted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-orange-600 text-sm font-medium">
                          <Clock className="w-4 h-4" />
                          Pending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-md w-full my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Create New Assignment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      dueDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drive Link (Instructions)
                </label>
                <input
                  type="url"
                  value={newAssignment.driveLink}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      driveLink: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowAddAssignment(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAssignment}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Create Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
   )

}