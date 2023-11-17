<script>
// @ts-nocheck


	export let data;

	let categories = data.categories;
	let locations = data.locations;

	/**
	 * @param id {number}
	 */
	async function filterByCat(id) {
		let endpoint = '/api/locations/';

		if (id != 0) {
			endpoint = `${endpoint}category/${id}`;
		}

		console.log('api endpoint: ', endpoint);

		// Call fetch
		const response = await fetch(endpoint);

		// if resonse code 200 (ok)
		if (response.ok) {
			// get json from resonse
			const json = await response.json();
			locations = json.data;
		}
	}
</script>

<!-- The HTML content of the page-->

<div class="container">
	<div class="row">
		<!-- Page Header -->
		<h2 class="mt-5">Locations from Supabase</h2>
	</div>
	{#if categories && locations}
		<div class="row">
			<div class="col-sm-2">
				<!-- Page Body Left Column (menu) -->
				<div id="categories" class="list-group">
					<button on:click={() => filterByCat(0)} class="list-group-item list-group-item-action">
						All Locations
					</button>
					{#each categories as cat}
						<button
							on:click={() => filterByCat(Number(cat.id))}
							class="list-group-item list-group-item-action"
						>
							{cat.name}
						</button>
					{/each}
				</div>
			</div>
			<!-- End category col -->

			<div class="col-sm-10">
				<!-- Page Body Right Side (Content goes here) -->
				<div id="locations">
					<table class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th>id</th>
								<th>name</th>
								<th>description</th>
							</tr>
						</thead>
						<tbody>
							{#each categories as category}
								<tr>
									<td>{category.id}</td>
									<td>{category.name}</td>
									<td>{category.description}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<!-- End locations col -->
		</div>
		<!-- End Row -->
	{:else}
		<p>No data to display</p>
	{/if}
	<p><a href="/add_category">Add new category</a></p>
</div>
<!-- End Main Content-->
