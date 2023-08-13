
export const getStatusBadgeClasses = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-gray-300 text-gray-800';
        case 'under_review':
            return 'bg-blue-300 text-blue-800';
        case 'in_progress':
            return 'bg-yellow-300 text-yellow-800';
        case 'escalated':
            return 'bg-red-300 text-red-800';
        case 'on_hold':
            return 'bg-purple-300 text-purple-800';
        case 'resolved':
            return 'bg-green-300 text-green-800';
        case 'partially_resolved':
            return 'bg-indigo-300 text-indigo-800';
        case 'rejected':
            return 'bg-pink-300 text-pink-800';
        case 'closed':
            return 'bg-teal-300 text-teal-800';
        case 'ongoing':
            return 'bg-orange-300 text-orange-800';
        case 'feedback_provided':
            return 'bg-cyan-300 text-cyan-800';
        default:
            return '';
    }
};