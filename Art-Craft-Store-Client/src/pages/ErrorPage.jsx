import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8" bis_skin_checked="1">
		<div className="max-w-md text-center" bis_skin_checked="1">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
			<Link to='/' ><button rel="noopener noreferrer" className="btn btn-active btn-accent px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Back to Homepage</button></Link>
		</div>
	</div>
</section>
    );
};

export default ErrorPage;