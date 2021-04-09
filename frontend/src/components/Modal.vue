<template>
	<div class="modal fade" ref="mountModal" tabindex="-1" aria-hidden="true" @click="close()">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<slot name="header" />
				</div>
				<div class="modal-body">
					<slot name="body" />
				</div>
				<div class="modal-footer">
					<slot name="footer" />
					<button type="button" class="btn btn-primary" @click.stop="close()">No</button>
					<button type="button" class="btn btn-danger" @click.stop="approve()">Yes</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Modal } from 'bootstrap';

export default {
	name: 'Modal',
	emits: ['closed', 'approved'],
	data() {
		return {
			modal: null,
		};
	},
	mounted() {
		this.modal = new Modal(this.$refs.mountModal);
		this.modal.show();
	},
	methods: {
		close() {
			this.modal.hide();
			this.$emit('closed');
		},
		approve() {
			this.modal.hide();
			this.$emit('approved');
		},
	},
};
</script>

<style>
</style>